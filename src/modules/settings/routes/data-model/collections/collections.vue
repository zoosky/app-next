<template>
	<private-view :title="$t('settings_data_model')">
		<template #title-outer:prepend>
			<v-button class="header-icon" rounded disabled icon secondary>
				<v-icon name="list_alt" />
			</v-button>
		</template>

		<template #actions>
			<v-button rounded icon @click="addNewActive = true">
				<v-icon name="add" />
			</v-button>
		</template>

		<template #navigation>
			<settings-navigation />
		</template>

		<template #drawer>
			<collections-filter v-model="activeTypes" />
		</template>

		<div class="padding-box">
			<v-table
				:headers.sync="tableHeaders"
				:items="items"
				@click:row="openCollection"
				show-resize
				fixed-header
				item-key="collection"
			>
				<template #item.icon="{ item }">
					<v-icon
						class="icon"
						:class="{
							hidden: item.hidden,
							system: item.collection.startsWith('directus_'),
							unmanaged:
								item.managed === false &&
								item.collection.startsWith('directus_') === false,
						}"
						:name="item.icon"
					/>
				</template>

				<template #item.collection="{ item }">
					<span
						class="collection"
						:class="{
							hidden: item.hidden,
							system: item.collection.startsWith('directus_'),
							unmanaged:
								item.managed === false &&
								item.collection.startsWith('directus_') === false,
						}"
					>
						{{ item.name }}
					</span>
				</template>

				<template #item.note="{ item }">
					<span class="note" :class="{ hidden: item.hidden }">
						{{ item.note }}
					</span>
				</template>

				<template #item-append="{ item }">
					<collection-options :collection="item" />
				</template>
			</v-table>
		</div>

		<new-collection v-model="addNewActive" />
	</private-view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import SettingsNavigation from '../../../components/navigation/';
import NewCollection from './components/new-collection/';
import { HeaderRaw } from '../../../../../components/v-table/types';
import { i18n } from '@/lang/';
import useCollectionsStore from '@/stores/collections';
import { Collection } from '@/stores/collections/types';
import useProjectsStore from '@/stores/projects';
import router from '@/router';
import { sortBy } from 'lodash';
import CollectionOptions from './components/collection-options';
import CollectionsFilter from './components/collections-filter';

export default defineComponent({
	components: { SettingsNavigation, NewCollection, CollectionOptions, CollectionsFilter },
	setup() {
		const addNewActive = ref(false);
		const activeTypes = ref(['visible', 'hidden', 'unmanaged']);

		const collectionsStore = useCollectionsStore();

		const tableHeaders = ref<HeaderRaw[]>([
			{
				text: '',
				value: 'icon',
				sortable: false,
			},
			{
				text: i18n.t('name'),
				value: 'collection',
			},
			{
				text: i18n.t('description'),
				value: 'note',
			},
		]);

		function openCollection({ collection }: Collection) {
			const { currentProjectKey } = useProjectsStore().state;
			router.push(`/${currentProjectKey}/settings/data-model/${collection}`);
		}

		const { items } = useItems();

		return {
			addNewActive,
			tableHeaders,
			items,
			openCollection,
			activeTypes,
		};

		function useItems() {
			const visible = computed(() => {
				return sortBy(
					collectionsStore.state.collections.filter(
						(collection) =>
							collection.collection.startsWith('directus_') === false &&
							collection.managed === true &&
							collection.hidden === false
					),
					'collection'
				);
			});

			const hidden = computed(() => {
				return sortBy(
					collectionsStore.state.collections
						.filter(
							(collection) =>
								collection.collection.startsWith('directus_') === false &&
								collection.managed === true &&
								collection.hidden === true
						)
						.map((collection) => ({ ...collection, icon: 'visibility_off' })),
					'collection'
				);
			});

			const system = computed(() => {
				return sortBy(
					collectionsStore.state.collections
						.filter(
							(collection) => collection.collection.startsWith('directus_') === true
						)
						.map((collection) => ({ ...collection, icon: 'settings' })),
					'collection'
				);
			});

			const unmanaged = computed(() => {
				return sortBy(
					collectionsStore.state.collections
						.filter(
							(collection) => collection.collection.startsWith('directus_') === false
						)
						.filter((collection) => collection.managed === false)
						.map((collection) => ({ ...collection, icon: 'block' })),
					'collection'
				);
			});

			const items = computed(() => {
				const items = [];

				if (activeTypes.value.includes('visible')) {
					items.push(visible.value);
				}

				if (activeTypes.value.includes('hidden')) {
					items.push(hidden.value);
				}

				if (activeTypes.value.includes('unmanaged')) {
					items.push(unmanaged.value);
				}

				if (activeTypes.value.includes('system')) {
					items.push(system.value);
				}

				return items.flat();
			});

			return { items };
		}
	},
});
</script>

<style lang="scss" scoped>
.icon ::v-deep i {
	vertical-align: baseline;
}

.hidden {
	color: var(--foreground-subdued);
}

.system {
	color: var(--primary);
}

.unmanaged {
	color: var(--warning);
}

.padding-box {
	padding: var(--content-padding);
}

.v-table {
	--v-table-sticky-offset-top: 64px;

	display: contents;
}

.header-icon {
	--v-button-color-disabled: var(--warning);
	--v-button-background-color-disabled: var(--warning-alt);
}
</style>
