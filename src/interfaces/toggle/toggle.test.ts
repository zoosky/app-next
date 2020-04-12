import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import InterfaceToggle from './switch.vue';

import VCheckbox from '@/components/v-checkbox';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);
localVue.component('v-switch', VCheckbox);

describe('Interfaces / Toggle', () => {
	it('Renders a checkbox', () => {
		const component = shallowMount(InterfaceToggle, {
			localVue,
			propsData: {},
			listeners: {
				change: () => {},
			},
		});
		expect(component.find(VCheckbox).exists()).toBe(true);
	});
});
