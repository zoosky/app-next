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
			field: 'checkbox',
			name: 'Checkbox',
			width: 'half',
			interface: 'switch',
		},
		{
			field: 'readonly',
			name: 'Readonly',
			width: 'half',
			interface: 'switch',
		},
	],
}));
