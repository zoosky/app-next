import InterfaceTextarea from './textarea.vue';
import { defineInterface } from '@/interfaces/define';

export default defineInterface(({ i18n }) => ({
	id: 'textarea',
	name: i18n.t('interfaces.textarea.textarea'),
	icon: 'box',
	component: InterfaceTextarea,
	options: [
		{
			field: 'placeholder',
			name: 'Placeholder',
			width: 'half',
			interface: 'text-input',
		},
		{
			field: 'trim',
			name: 'Trim',
			width: 'half',
			interface: 'switch',
		},
		{
			field: 'font',
			name: 'Font',
			width: 'half',
			interface: 'select-one-dropdown',
			options: {
				items: [
					{ itemText: 'Sans', itemValue: 'sans-serif' },
					{ itemText: 'Mono', itemValue: 'monospace' },
					{ itemText: 'Serif', itemValue: 'serif' },
				],
			},
		},
	],
}));
