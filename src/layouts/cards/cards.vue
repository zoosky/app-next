<template>
	<div class="layout-cards" :style="{ '--size': size + 'px' }">
		<portal to="drawer">
			<drawer-detail icon="crop_square" :title="$t('layouts.cards.size')">
				<v-slider v-model="size" :min="100" :max="200" :step="1" />
			</drawer-detail>
		</portal>

		<div class="grid">
			<card
				v-for="item in items"
				:key="item[primaryKeyField.field]"
				:size="size"
				:icon="icon"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, inject, computed, ref } from '@vue/composition-api';
import { Filter } from '@/stores/collection-presets/types';
import useSync from '@/compositions/use-sync/';
import useCollection from '@/compositions/use-collection/';
import useItems from '@/compositions/use-items';
import Card from './components/card.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

type ViewOptions = {
	size?: number;
	icon?: string;
};

type ViewQuery = {
	fields?: string[];
	sort?: string;
	limit?: number;
};

export default defineComponent({
	components: { Card },
	props: {
		collection: {
			type: String,
			required: true,
		},
		selection: {
			type: Array as PropType<Item[]>,
			default: undefined,
		},
		viewOptions: {
			type: Object as PropType<ViewOptions>,
			default: null,
		},
		viewQuery: {
			type: Object as PropType<ViewQuery>,
			default: null,
		},
		filters: {
			type: Array as PropType<Filter[]>,
			default: () => [],
		},
		selectMode: {
			type: Boolean,
			default: false,
		},
		detailRoute: {
			type: String,
			default: `/{{project}}/collections/{{collection}}/{{primaryKey}}`,
		},
	},
	setup(props, { emit }) {
		const mainElement = inject('main-element', ref<Element>(null));

		const _selection = useSync(props, 'selection', emit);
		const _viewOptions = useSync(props, 'viewOptions', emit);
		const _viewQuery = useSync(props, 'viewQuery', emit);
		const _filters = useSync(props, 'filters', emit);

		const { collection } = toRefs(props);
		const { primaryKeyField, fields: fieldsInCollection } = useCollection(collection);

		const availableFields = computed(() =>
			fieldsInCollection.value.filter(({ hidden_browse }) => hidden_browse === false)
		);

		const { sort, limit, page } = useItemOptions();

		const { items, loading, error, totalPages, itemCount } = useItems(collection, {
			sort,
			limit,
			page,
			fields: ref(['*']),
			filters: _filters,
		});

		const size = computed({
			get() {
				return _viewOptions.value?.size || 120;
			},
			set(newSize: number) {
				_viewOptions.value = {
					..._viewOptions.value,
					size: newSize,
				};
			},
		});

		const icon = computed({
			get() {
				return _viewOptions.value?.icon || 'box';
			},
			set(newIcon: string) {
				_viewOptions.value = {
					..._viewOptions.value,
					icon: newIcon,
				};
			},
		});

		const cards = computed(() => items.value.map((item: Item) => {

		}));

		return {
			_selection,
			items,
			loading,
			error,
			totalPages,
			page,
			toPage,
			itemCount,
			availableFields,
			limit,
			size,
			primaryKeyField,
			icon,
		};

		function toPage(newPage: number) {
			page.value = newPage;
			mainElement.value?.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}

		function useItemOptions() {
			const page = ref(1);

			const sort = computed({
				get() {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					return _viewQuery.value?.sort || primaryKeyField.value!.field;
				},
				set(newSort: string) {
					page.value = 1;
					_viewQuery.value = {
						..._viewQuery.value,
						sort: newSort,
					};
				},
			});

			const limit = computed({
				get() {
					return _viewQuery.value?.limit || 25;
				},
				set(newLimit: number) {
					page.value = 1;
					_viewQuery.value = {
						..._viewQuery.value,
						limit: newLimit,
					};
				},
			});

			return { sort, limit, page };
		}
	},
});
</script>

<style lang="scss" scoped>
.layout-cards {
	padding: var(--content-padding);
}

.grid {
	display: grid;
	grid-gap: calc(0.1666666667 * var(--size)) 24px;
	grid-template-columns: repeat(auto-fit, var(--size));
	justify-content: space-between;
}
</style>
