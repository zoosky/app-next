import InterfaceSwitch from './switch.vue';
import { defineInterface } from '@/interfaces/define';

export default defineInterface(({ i18n }) => ({
	id: 'switch',
	name: i18n.t('interfaces.switch.switch'),
	icon: 'toggle_on',
	component: InterfaceSwitch,
	options: [
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
			interface: 'text-input',
		},
		{
			field: 'colorOff',
			name: 'Color Off',
			width: 'half',
			interface: 'text-input',
		},
	],
}));
