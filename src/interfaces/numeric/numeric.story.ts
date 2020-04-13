import { withKnobs, boolean, text, optionsKnob, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import { InterfaceNumericInput, InterfaceNumericSlider } from './';
import markdown from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { defineComponent, ref } from '@vue/composition-api';
import RawValue from '../../../.storybook/raw-value.vue';

Vue.component('interface-numeric-input', InterfaceNumericInput.component as any);
Vue.component('interface-numeric-slider', InterfaceNumericSlider.component as any);

export default {
	title: 'Interfaces / Numeric',
	decorators: [withKnobs, withPadding],
	parameters: {
		notes: markdown,
	},
};

export const input = () =>
	defineComponent({
		components: { RawValue },
		props: {
			placeholder: {
				default: text('Placeholder', 'Enter a value...', 'Options'),
			},
			minValue: {
				default: number('Min Value', 0, {}, 'Options'),
			},
			maxValue: {
				default: number('Max Value', 10, {}, 'Options'),
			},
			stepInterval: {
				default: number('Step Interval', 1, {}, 'Options'),
			},
			iconLeft: {
				default: text('Icon Left', '', 'Options'),
			},
			iconRight: {
				default: text('Icon Right', '', 'Options'),
			},
			font: {
				default: optionsKnob(
					'Font',
					{ Sans: 'sans-serif', Serif: 'serif', Mono: 'monospace' },
					'sans-serif',
					{ display: 'select' },
					'Options'
				),
			},
			readonly: {
				default: boolean('Readonly', false, 'Options'),
			},
		},
		setup() {
			const onInput = action('input');
			const value = ref(null);
			return { onInput, value };
		},
		template: `
		<div>
			<interface-numeric-input
				v-model="value"
				v-bind="{ placeholder, minValue, maxValue, stepInterval, iconLeft, iconRight, font, readonly }"
				@input="onInput"
			/>
			<raw-value>{{ value }}</raw-value>
		</div>
		`,
	});

export const slider = () =>
	defineComponent({
		components: { RawValue },
		props: {
			placeholder: {
				default: text('Placeholder', 'Enter a value...', 'Options'),
			},
			minValue: {
				default: number('Min Value', 0, {}, 'Options'),
			},
			maxValue: {
				default: number('Max Value', 10, {}, 'Options'),
			},
			stepInterval: {
				default: number('Step Interval', 1, {}, 'Options'),
			},
			iconLeft: {
				default: text('Icon Left', '', 'Options'),
			},
			iconRight: {
				default: text('Icon Right', '', 'Options'),
			},
			font: {
				default: optionsKnob(
					'Font',
					{ Sans: 'sans-serif', Serif: 'serif', Mono: 'monospace' },
					'sans-serif',
					{ display: 'select' },
					'Options'
				),
			},
			readonly: {
				default: boolean('Readonly', false, 'Options'),
			},
		},
		setup() {
			const onInput = action('input');
			const value = ref(null);
			return { onInput, value };
		},
		template: `
		<div>
			<interface-numeric-slider
				v-model="value"
				v-bind="{ placeholder, minValue, maxValue, stepInterval, iconLeft, iconRight, font, readonly }"
				@input="onInput"
			/>
			<raw-value>{{ value }}</raw-value>
		</div>
		`,
	});
