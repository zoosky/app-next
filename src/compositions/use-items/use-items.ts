import { computed, ref, Ref, watch } from '@vue/composition-api';
import api from '@/api';
import useProjectsStore from '@/stores/projects';
import useCollection from '@/compositions/use-collection';
import Vue from 'vue';
import { isEqual } from 'lodash';
import { Filter } from '@/stores/collection-presets/types';
import filtersToQuery from '@/utils/filters-to-query';
import { orderBy } from 'lodash';

type Options = {
	limit: Ref<number>;
	fields: Ref<readonly string[]>;
	sort: Ref<string>;
	page: Ref<number>;
	filters: Ref<readonly Filter[]>;
};

export function useItems(collection: Ref<string>, options: Options) {
	const projectsStore = useProjectsStore();
	const { primaryKeyField } = useCollection(collection);

	const { limit, fields, sort, page, filters } = options;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const items = ref<any>([]);
	const loading = ref(false);
	const error = ref(null);

	const itemCount = ref<number>(null);

	const totalPages = computed(() => {
		if (itemCount.value === null) return 1;
		if (itemCount.value < limit.value) return 1;
		return Math.ceil(itemCount.value / limit.value);
	});

	getItems();

	watch(collection, async (after, before) => {
		if (!before || isEqual(after, before)) {
			return;
		}

		// Waiting for the tick here makes sure the options have been adjusted for the new
		// collection
		await Vue.nextTick();
		reset();
		getItems();
	});

	watch([page, fields], async (after, before) => {
		if (!before || isEqual(after, before)) {
			return;
		}

		await Vue.nextTick();
		if (loading.value === false) {
			getItems();
		}
	});

	watch(sort, async (after, before) => {
		if (!before || isEqual(after, before)) {
			return;
		}

		// When all items are on page, we only sort locally
		const hasAllItems = limit.value > (itemCount.value || 0);

		if (hasAllItems) {
			sortItems(after);
			return;
		}

		await Vue.nextTick();
		if (loading.value === false) {
			getItems();
		}
	});

	watch([filters, limit], async (after, before) => {
		if (!before || isEqual(after, before)) {
			return;
		}

		/**
		 * @NOTE
		 *
		 * When the filters or items per page change, we have to re-calculate the total amount of
		 * items too, as the total amount of available items and pages is based on the two.
		 */
		itemCount.value = null;

		await Vue.nextTick();
		if (loading.value === false) {
			getItems();
		}
	});

	return { itemCount, items, totalPages, loading, error };

	async function getItems() {
		const { currentProjectKey } = projectsStore.state;
		loading.value = true;

		const fieldsToFetch = [...fields.value];

		// Make sure the primary key is always fetched
		if (
			fields.value !== ['*'] &&
			primaryKeyField.value &&
			fieldsToFetch.includes(primaryKeyField.value.field) === false
		) {
			fieldsToFetch.push(primaryKeyField.value.field);
		}

		// Make sure all fields that are used to filter are fetched
		if (fields.value !== ['*']) {
			filters.value.forEach((filter) => {
				if (fieldsToFetch.includes(filter.field) === false) {
					fieldsToFetch.push(filter.field);
				}
			});
		}

		try {
			const endpoint = collection.value.startsWith('directus_')
				? `/${currentProjectKey}/${collection.value.substring(9)}`
				: `/${currentProjectKey}/items/${collection.value}`;

			const response = await api.get(endpoint, {
				params: {
					limit: limit.value,
					fields: fieldsToFetch,
					sort: sort.value,
					page: page.value,
					...filtersToQuery(filters.value),
				},
			});

			items.value = response.data.data;

			if (itemCount.value === null) {
				itemCount.value = response.data.data.length;

				if (response.data.data.length === limit.value) {
					// Requesting the page filter count in the actual request every time slows
					// the request down by like 600ms-1s. This makes sure we only fetch the count
					// once if needed.
					getTotalCount();
				}
			}
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	}

	async function getTotalCount() {
		if (!primaryKeyField.value) return;

		const { currentProjectKey } = projectsStore.state;

		const endpoint = collection.value.startsWith('directus_')
			? `/${currentProjectKey}/${collection.value.substring(9)}`
			: `/${currentProjectKey}/items/${collection.value}`;

		const response = await api.get(endpoint, {
			params: {
				limit: 0,
				fields: primaryKeyField.value.field,
				meta: 'filter_count',
				...filtersToQuery(filters.value),
			},
		});

		itemCount.value = response.data.meta.filter_count;
	}

	function reset() {
		items.value = [];
		itemCount.value = null;
	}

	function sortItems(sort: string) {
		const field = sort.startsWith('-') ? sort.substring(1) : sort;
		const descending = sort.startsWith('-');
		items.value = orderBy(items.value, [field], [descending ? 'desc' : 'asc']);
	}
}
