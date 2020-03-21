import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import InterfaceCheckbox from './checkbox.vue';
import markdown from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { defineComponent } from '@vue/composition-api';

Vue.component('interface-checkbox', InterfaceCheckbox);

export default {
	title: 'Interfaces / Checkbox',
	decorators: [withKnobs, withPadding],
	parameters: {
		notes: markdown
	}
};

export const basic = () =>
	defineComponent({
		props: {
			indeterminate: {
				default: boolean('Indeterminate', false)
			},
			disabled: {
				default: boolean('Disabled', false)
			},
			label: {
				default: text('Placeholder', '')
			}
		},
		setup() {
			const onInput = action('input');
			return { onInput };
		},
		template: `
			<interface-checkbox
                :label="label"
                :disabled="disabled"
                :indeterminate="indeterminate"
				@input="onInput"
			/>
		`
	});
