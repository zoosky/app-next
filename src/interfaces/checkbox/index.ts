import InterfaceCheckbox from './checkbox.vue';
import { defineInterface } from '@/interfaces/define';
import formatTitle from '@directus/format-title';

export default defineInterface({
	id: 'checkbox',
	register: ({ i18n }) => ({
		name: i18n.t('interfaces.checkbox.checkbox'),
		icon: 'box',
		component: InterfaceCheckbox,
		display: value => {
			return formatTitle(value);
		}
	})
});
