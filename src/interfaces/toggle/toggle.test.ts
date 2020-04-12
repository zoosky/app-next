import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import InterfaceToggle from './switch.vue';

import VSwitch from '@/components/v-switch';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);
localVue.component('v-switch', VSwitch);

describe('Interfaces / Switch', () => {
	it('Renders a switch', () => {
		const component = shallowMount(InterfaceToggle, {
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
