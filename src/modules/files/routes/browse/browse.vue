<template>
	<private-view :title="$t('files')">
		<template #title-outer:prepend>
			<v-button rounded disabled icon secondary>
				<v-icon name="folder" />
			</v-button>
		</template>

		<template #drawer>
			<layout-drawer-detail v-model="viewType" />
			<filter-drawer-detail v-model="filters" collection="directus_files" />
			<portal-target name="drawer" />
		</template>

		<template #actions>
			<v-dialog v-model="confirmDelete">
				<template #activator="{ on }">
					<v-button
						rounded
						icon
						class="action-delete"
						v-if="selection.length > 0"
						@click="on"
					>
						<v-icon name="delete" />
					</v-button>
				</template>

				<v-card>
					<v-card-title>{{ $tc('batch_delete_confirm', selection.length) }}</v-card-title>

					<v-card-actions>
						<v-button @click="confirmDelete = false" secondary>
							{{ $t('cancel') }}
						</v-button>
						<v-button @click="batchDelete" class="action-delete" :loading="deleting">
							{{ $t('delete') }}
						</v-button>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-button rounded icon class="action-batch" v-if="selection.length > 1" :to="batchLink">
				<v-icon name="edit" />
			</v-button>

			<v-button rounded icon :to="addNewLink">
				<v-icon name="add" />
			</v-button>
		</template>

		<template #navigation>
			<files-navigation />
		</template>

		<component
			class="layout"
			ref="layout"
			:is="`layout-${viewType}`"
			collection="directus_files"
			:selection.sync="selection"
			:view-options.sync="viewOptions"
			:view-query.sync="viewQuery"
			:filters.sync="filters"
			:detail-route="'/{{project}}/files/{{primaryKey}}'"
		/>
	</private-view>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import FilesNavigation from '../../components/navigation/';
import useProjectsStore from '@/stores/projects';
import { i18n } from '@/lang';
import api from '@/api';
import { LayoutComponent } from '@/layouts/types';
import useCollectionPreset from '@/compositions/use-collection-preset';
import FilterDrawerDetail from '@/views/private/components/filter-drawer-detail';
import LayoutDrawerDetail from '@/views/private/components/layout-drawer-detail';

type Item = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[field: string]: any;
};

export default defineComponent({
	name: 'files-browse',
	components: { FilesNavigation, FilterDrawerDetail, LayoutDrawerDetail },
	props: {},
	setup() {
		const layout = ref<LayoutComponent>(null);
		const projectsStore = useProjectsStore();

		const selection = ref<Item[]>([]);

		const { viewType, viewOptions, viewQuery, filters } = useCollectionPreset(
			ref('directus_files')
		);
		const { addNewLink, batchLink } = useLinks();
		const { confirmDelete, deleting, batchDelete } = useBatchDelete();
		const { breadcrumb } = useBreadcrumb();

		return {
			addNewLink,
			batchDelete,
			batchLink,
			breadcrumb,
			confirmDelete,
			deleting,
			filters,
			layout,
			selection,
			viewOptions,
			viewQuery,
			viewType,
		};

		function useBatchDelete() {
			const confirmDelete = ref(false);
			const deleting = ref(false);

			return { confirmDelete, deleting, batchDelete };

			async function batchDelete() {
				const currentProjectKey = projectsStore.state.currentProjectKey;

				deleting.value = true;

				confirmDelete.value = false;

				const batchPrimaryKeys = selection.value.map((item) => item.id).join();

				await api.delete(`/${currentProjectKey}/files/${batchPrimaryKeys}`);

				await layout.value?.refresh();

				selection.value = [];
				deleting.value = false;
				confirmDelete.value = false;
			}
		}

		function useLinks() {
			const addNewLink = computed<string>(() => {
				const currentProjectKey = projectsStore.state.currentProjectKey;
				return `/${currentProjectKey}/files/+`;
			});

			const batchLink = computed<string>(() => {
				const currentProjectKey = projectsStore.state.currentProjectKey;
				const batchPrimaryKeys = selection.value.map((item) => item.id).join();
				return `/${currentProjectKey}/files/${batchPrimaryKeys}`;
			});

			return { addNewLink, batchLink };
		}

		function useBreadcrumb() {
			const breadcrumb = computed(() => {
				const currentProjectKey = projectsStore.state.currentProjectKey;

				return [
					{
						name: i18n.tc('collection', 2),
						to: `/${currentProjectKey}/collections`,
					},
				];
			});

			return { breadcrumb };
		}
	},
});
</script>

<style lang="scss" scoped>
.action-delete {
	--v-button-background-color: var(--danger);
	--v-button-background-color-hover: var(--danger-dark);
}

.action-batch {
	--v-button-background-color: var(--warning);
	--v-button-background-color-hover: var(--warning-150);
}

.layout {
	--layout-offset-top: 64px;
}
</style>
