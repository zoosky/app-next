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
			<interface-switch
        v-bind="{ labelOn, labelOff, colorOn, colorOff }"
        @change="onChange"
        value="test"
        v-model="checked"
			/>
		`,
	});
