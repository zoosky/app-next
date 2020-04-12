import InterfaceToggle from './toggle.vue';
import { defineInterface } from '@/interfaces/define';

export default defineInterface(({ i18n }) => ({
	id: 'toggle',
	name: i18n.t('interfaces.toggle.toggle'),
	icon: 'toggle_on',
	component: InterfaceToggle,
	options: [
		{
			field: 'iconOn',
			name: 'Icon On',
			width: 'half',
			interface: 'icon',
		},
		{
			field: 'iconOff',
			name: 'Icon Off',
			width: 'half',
			interface: 'icon',
		},
		{
			field: 'labelOn',
			name: 'Label On',
			width: 'half',
			interface: 'text-input',
		},
		{
			field: 'labelOff',
			name: 'Label Off',
			width: 'half',
			interface: 'text-input',
		},
		{
			field: 'colorOn',
			name: 'Color On',
			width: 'half',
			interface: 'color',
		},
		{
			field: 'colorOff',
			name: 'Color Off',
			width: 'half',
			interface: 'color',
		},
	],
}));
