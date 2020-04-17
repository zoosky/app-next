<template>
	<div class="layout-cards" :style="{ '--size': size + 'px' }">
		<portal to="drawer">
			<drawer-detail icon="crop_square" :title="$t('layouts.cards.size')">
				<v-slider v-model="size" :min="100" :max="200" :step="1" />
			</drawer-detail>
			<drawer-detail icon="settings" :title="$t('setup')">
				<div class="type-label">{{ $t('layouts.cards.image_source') }}</div>
				<v-select
					v-model="imageSource"
					full-width
					item-value="field"
					item-text="name"
					:items="fileFields"
				/>
			</drawer-detail>
		</portal>

		<div class="grid">
			<card
				v-for="item in items"
				:key="item[primaryKeyField.field]"
				:crop="crop"
				:icon="icon"
				:file="imageSource ? item[imageSource] : null"
			>
				<template #title v-if="title">
					<render-template :collection="collection" :item="item" :template="title" />
				</template>
				<template #subtitle v-if="subtitle">
					<render-template :collection="collection" :item="item" :template="subtitle" />
				</template>
			</card>

			<template v-if="loading">
				<card v-for="n in 15" :key="`loader-${n}`" loading />
			</template>
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
	crop?: boolean;
	imageSource?: string;
	title?: string;
	subtitle?: string;
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
		file: {
			type: Object as PropType<File>,
			default: null,
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

		const fileFields = computed(() => {
			return availableFields.value.filter((field) => field.type === 'file');
		});

		const { sort, limit, page } = useItemOptions();

		const { items, loading, error, totalPages, itemCount } = useItems(collection, {
			sort,
			limit,
			page,
			fields: ref(['*']),
			filters: _filters,
		});

		const { crop, size, icon, imageSource, title, subtitle } = useViewOptions();

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
			crop,
			fileFields,
			imageSource,
			title,
			subtitle,
		};

		function toPage(newPage: number) {
			page.value = newPage;
			mainElement.value?.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}

		function useViewOptions() {
			const size = createViewOption('size', 120);
			const crop = createViewOption('crop', true);
			const icon = createViewOption('icon', 'box');
			const title = createViewOption('title', null);
			const subtitle = createViewOption('subtitle', null);
			const imageSource = createViewOption('imageSource', fileFields.value[0]?.field || null);

			return { size, crop, icon, imageSource, title, subtitle };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			function createViewOption<T>(key: keyof ViewOptions, defaultValue: any) {
				return computed<T>({
					get() {
						return _viewOptions.value?.[key] || defaultValue;
					},
					set(newValue: T) {
						_viewOptions.value = {
							..._viewOptions.value,
							[key]: newValue,
						};
					},
				});
			}
		}

		function useItemOptions() {
			const page = ref(1);

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const sort = createItemOption<string>('sort', primaryKeyField.value!.field);
			const limit = createItemOption<number>('limit', 25);

			return { sort, limit, page };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			function createItemOption<T>(key: keyof ViewQuery, defaultValue: any) {
				return computed<T>({
					get() {
						return _viewQuery.value?.[key] || defaultValue;
					},
					set(newValue: T) {
						page.value = 1;
						_viewQuery.value = {
							..._viewQuery.value,
							[key]: newValue,
						};
					},
				});
			}
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
