import InterfaceDivider from './divider.vue';
import { defineInterface } from '@/interfaces/define';

export default defineInterface(({ i18n }) => ({
	id: 'divider',
	name: i18n.t('interfaces.divider.divider'),
	icon: 'remove',
	component: InterfaceDivider,
	options: [
		{
			field: 'color',
			name: 'Color',
			width: 'half',
			interface: 'text-input',
		},
	],
}));
