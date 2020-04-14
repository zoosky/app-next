import { createStore } from 'pinia';
import api from '@/api';
import { Collection, CollectionRaw } from './types';
import { useProjectsStore } from '@/stores/projects';
import i18n from '@/lang/';
import { notEmpty } from '@/utils/is-empty/';
import VueI18n from 'vue-i18n';
import formatTitle from '@directus/format-title';
import notify from '@/utils/notify';

export const useCollectionsStore = createStore({
	id: 'collectionsStore',
	state: () => ({
		collections: [] as Collection[],
	}),
	getters: {
		visibleCollections: (state) => {
			return state.collections
				.filter(({ collection }) => collection.startsWith('directus_') === false)
				.filter(({ hidden }) => hidden !== true);
		},
	},
	actions: {
		async hydrate() {
			const projectsStore = useProjectsStore();
			const currentProjectKey = projectsStore.state.currentProjectKey;

			const response = await api.get(`/${currentProjectKey}/collections`);

			const collections: CollectionRaw[] = response.data.data;

			this.state.collections = collections.map((collection: CollectionRaw) => {
				let name: string | VueI18n.TranslateResult;
				const icon = collection.icon || 'box';

				if (notEmpty(collection.translation)) {
					for (let i = 0; i < collection.translation.length; i++) {
						const { locale, translation } = collection.translation[i];

						i18n.mergeLocaleMessage(locale, {
							collections: {
								[collection.collection]: translation,
							},
						});
					}

					name = i18n.t(`collections.${collection.collection}`);
				} else {
					name = formatTitle(collection.collection);
				}

				return {
					...collection,
					name,
					icon,
				};
			});
		},
		async dehydrate() {
			this.reset();
		},
		async updateCollection(collection: string, updates: Partial<Collection>) {
			const { currentProjectKey } = useProjectsStore().state;

			try {
				await api.patch(`${currentProjectKey}/collections/${collection}`, updates);
				await this.hydrate();
				notify({
					type: 'success',
					title: i18n.t('update_collection_success'),
					text: collection,
				});
			} catch (error) {
				notify({
					type: 'error',
					title: i18n.t('update_collection_failed'),
					text: collection,
				});
				throw error;
			}
		},
		async deleteCollection(collection: string) {
			const { currentProjectKey } = useProjectsStore().state;

			try {
				await api.delete(`${currentProjectKey}/collections/${collection}`);
				await this.hydrate();
				notify({
					type: 'success',
					title: i18n.t('delete_collection_success'),
					text: collection,
				});
			} catch (error) {
				notify({
					type: 'error',
					title: i18n.t('delete_collection_failed'),
					text: collection,
				});
				throw error;
			}
		},
		getCollection(collectionKey: string) {
			return (
				this.state.collections.find(
					(collection) => collection.collection === collectionKey
				) || null
			);
		},
	},
});
