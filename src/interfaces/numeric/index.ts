import InterfaceNumericBase from './base/';
import { interfaceFactory } from '@/utils/factory';
import { InterfaceDefineParamGeneric, InterfaceConfig } from '@/interfaces/types';

const defineConfig: InterfaceDefineParamGeneric<Omit<InterfaceConfig, 'component'>> = ({
	i18n,
}) => ({
	id: 'numeric',
	name: i18n.t('interfaces.numeric.numeric'),
	icon: 'dialpad',
	options: [
		{
			field: 'placeholder',
			name: 'Placeholder',
			width: 'half',
			interface: 'text-input',
		},
		{
			field: 'minValue',
			name: 'Minimum Value',
			width: 'half',
			interface: 'numeric',
		},
		{
			field: 'maxValue',
			name: 'Maximum Value',
			width: 'half',
			interface: 'numeric',
		},
		{
			field: 'stepInterval',
			name: 'Step Interval',
			width: 'half',
			interface: 'numeric',
		},
		{
			field: 'iconLeft',
			name: 'Icon Left',
			width: 'half',
			interface: 'icon',
		},
		{
			field: 'iconRight',
			name: 'Icon Right',
			width: 'half',
			interface: 'icon',
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
});

export const InterfaceNumericInput = interfaceFactory(
	InterfaceNumericBase,
	'v-input',
	'input',
	defineConfig
);

export const InterfaceNumericSlider = interfaceFactory(
	InterfaceNumericBase,
	'v-slider',
	'slider',
	defineConfig
);

export default { InterfaceNumericInput, InterfaceNumericSlider };
