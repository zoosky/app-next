<template>
	<v-button
		v-if="
			collection.managed === false && collection.collection.startsWith('directus_') === false
		"
		x-small
		@click="toggleManaged(true)"
		:loading="savingManaged"
	>
		{{ $t('manage') }}
	</v-button>
	<v-menu
		v-else-if="collection.collection.startsWith('directus_') === false"
		placement="left-start"
		show-arrow
		close-on-content-click
		:disabled="savingManaged"
	>
		<template #activator="{ toggle }">
			<v-progress-circular small v-if="savingManaged" indeterminate />
			<v-icon v-else name="more_vert" @click="toggle" class="ctx-toggle" />
		</template>
		<v-list dense>
			<v-list-item @click="toggleManaged(false)">
				<v-list-item-icon>
					<v-icon name="block" />
				</v-list-item-icon>
				<v-list-item-content>
					{{ $t('unmanage_collection') }}
				</v-list-item-content>
			</v-list-item>
			<v-dialog v-model="deleteActive">
				<template #activator="{ on }">
					<v-list-item @click="on">
						<v-list-item-icon>
							<v-icon name="delete" />
						</v-list-item-icon>
						<v-list-item-content>
							{{ $t('delete_collection') }}
						</v-list-item-content>
					</v-list-item>
				</template>
				<v-card>
					<v-card-title>{{ $t('delete_collection_are_you_sure') }}</v-card-title>
					<v-card-actions>
						<v-button :disabled="deleting" secondary @click="deleteActive = null">
							{{ $t('cancel') }}
						</v-button>
						<v-button :loading="deleting" class="delete" @click="deleteCollection">
							{{ $t('delete_collection') }}
						</v-button>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';
import { Collection } from '@/stores/collections/types';
import useCollectionsStore from '@/stores/collections';

export default defineComponent({
	props: {
		collection: {
			type: Object as PropType<Collection>,
			required: true,
		},
	},
	setup(props) {
		const collectionsStore = useCollectionsStore();
		const { deleting, deleteActive, deleteCollection } = useDelete();
		const { savingManaged, toggleManaged } = useManage();

		return { deleting, deleteActive, deleteCollection, savingManaged, toggleManaged };

		function useDelete() {
			const deleting = ref(false);
			const deleteActive = ref(false);

			return { deleting, deleteActive, deleteCollection };

			async function deleteCollection() {
				deleting.value = true;

				try {
					await collectionsStore.deleteCollection(props.collection.collection);
					deleteActive.value = false;
				} finally {
					deleting.value = false;
				}
			}
		}

		function useManage() {
			const savingManaged = ref(false);

			return { savingManaged, toggleManaged };

			async function toggleManaged(on: boolean) {
				savingManaged.value = true;

				try {
					await collectionsStore.updateCollection(props.collection.collection, {
						managed: on,
					});
				} finally {
					savingManaged.value = false;
				}
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.v-button.delete {
	--v-button-background-color: var(--danger);
}

.ctx-toggle {
	--v-icon-color: var(--foreground-subdued);

	&:hover {
		--v-icon-color: var(--foreground-normal);
	}
}
</style>
