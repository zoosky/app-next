import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Vue from 'vue';
import InterfaceSwitch from './switch.vue';
import markdown from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { defineComponent, ref } from '@vue/composition-api';

Vue.component('interface-switch', InterfaceSwitch);

export default {
	title: 'Interfaces / Switch',
	decorators: [withKnobs, withPadding],
	parameters: {
		notes: markdown,
	},
};

export const basic = () =>
	defineComponent({
		props: {
			readonly: {
				default: boolean('Readonly', false, 'Options'),
			},
			labelOn: {
				default: text('Label On', '', 'Options'),
			},
			labelOff: {
				default: text('Label Off', '', 'Options'),
			},
			checkbox: {
				default: boolean('Checkbox', false, 'Options'),
			},
		},
		setup() {
			const onChange = action('change');
			const checked = ref(false);
			return { onChange, checked };
		},
		template: `
			<interface-switch
        v-bind="{ readonly, labelOn, labelOff, checkbox }"
        @change="onChange"
        value="test"
        v-model="checked"
			/>
		`,
	});
