import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueCompositionAPI from '@vue/composition-api';
import VIcon from '@/components/v-icon/';
import DrawerButton from './drawer-button.vue';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);
localVue.component('v-icon', VIcon);

describe('Views / Private / Components / Drawer Button', () => {
	it('Does not render the title when the drawer is closed', () => {
		const component = shallowMount(DrawerButton, {
			localVue,
			provide: {
				'drawer-open': false,
			},
		});

		expect(component.find('.title').exists()).toBe(false);
	});
});
