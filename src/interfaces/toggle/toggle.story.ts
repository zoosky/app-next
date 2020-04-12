import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import InterfaceToggle from './toggle.vue';
import markdown from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { defineComponent, ref } from '@vue/composition-api';

Vue.component('interface-toggle', InterfaceToggle);

export default {
	title: 'Interfaces / Toggle',
	decorators: [withKnobs, withPadding],
	parameters: {
		notes: markdown,
	},
};

export const basic = () =>
	defineComponent({
		props: {
			iconOn: {
				default: text('Icon On', '', 'Options'),
			},
			iconOff: {
				default: text('Icon Off', '', 'Options'),
			},
			labelOn: {
				default: text('Label On', '', 'Options'),
			},
			labelOff: {
				default: text('Label Off', '', 'Options'),
			},
			colorOn: {
				default: text('Color On', '', 'Options'),
			},
			colorOff: {
				default: text('Color Off', '', 'Options'),
			},
		},
		setup() {
			const onChange = action('change');
			const checked = ref(false);
			return { onChange, checked };
		},
		template: `
			<interface-toggle
        v-bind="{labelOn, labelOff, iconOn, iconOff, colorOn, colorOff}"
        @change="onChange"
        value="test"
        v-model="checked"
			/>
		`,
	});
