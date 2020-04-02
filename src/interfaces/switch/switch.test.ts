import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import InterfaceSwitch from './switch.vue';

import VSwitch from '@/components/v-switch';
import VCheckbox from '@/components/v-checkbox';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);
localVue.component('v-switch', VSwitch);
localVue.component('v-checkbox', VCheckbox);

describe('Interfaces / Switch', () => {
	it('Renders a switch', () => {
		const component = shallowMount(InterfaceSwitch, {
			localVue,
			propsData: {
				checkbox: false,
				readonly: false,
			},
			listeners: {
				change: () => {},
			},
		});
		expect(component.find(VSwitch).exists()).toBe(true);
	});
});

describe('Interfaces / Switch', () => {
	it('Renders a checkbox', () => {
		const component = shallowMount(InterfaceSwitch, {
			localVue,
			propsData: {
				checkbox: true,
				readonly: false,
			},
			listeners: {
				change: () => {},
			},
		});
		expect(component.find(VCheckbox).exists()).toBe(true);
	});
});
