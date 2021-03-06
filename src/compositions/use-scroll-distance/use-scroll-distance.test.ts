import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueCompositionAPI, { defineComponent, ref, onMounted } from '@vue/composition-api';
import useScrollDistance from './use-scroll-distance';
import mountComposition from '../../../.jest/mount-composition';
import Vue from 'vue';
import VSheet from '@/components/v-sheet';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

describe('Compositions / useScrollDistance', () => {
	it('Returns the correct scroll position', () => {
		const TestComponent = defineComponent({
			setup() {
				const el = ref<Element>(null);

				const { top, left } = useScrollDistance(el);

				onMounted(() => {
					el.value!.scrollTop = 150;
					el.value!.scrollLeft = 200;
					el.value!.dispatchEvent(new Event('scroll'));

					expect(top.value).toBe(150);
					expect(left.value).toBe(200);
				});

				return { el };
			},
			template: `
				<div ref="el" style="max-width: 150px; max-height: 150px; overflow: auto;">
					<div style="width: 600px; height: 600px;" />
				</div>
			`,
		});

		shallowMount(TestComponent, { localVue });
	});

	it('Supports elements or refs for param', () => {
		mountComposition(() => {
			const testEl = null;
			const testVal = ref(testEl);
			const result = useScrollDistance(testVal);
			expect(result.target.value).toBe(null);
		}).destroy();

		mountComposition(() => {
			const testEl = document.createElement('div');
			const testVal = testEl;
			const result = useScrollDistance(testVal);
			expect(result.target.value).toBe(testEl);
		}).destroy();

		mountComposition(() => {
			const testEl = document.createElement('div');
			const testVal = ref(testEl);
			const result = useScrollDistance(testVal);
			expect(result.target.value).toBe(testEl);
		}).destroy();

		const TestComponent = defineComponent({
			components: { VSheet },
			setup() {
				const el = ref<Vue>(null);
				const { target } = useScrollDistance(el);

				onMounted(() => {
					expect(target.value instanceof HTMLElement).toBe(true);
				});

				return { el };
			},
			template: `
				<v-sheet ref="el" style="max-width: 150px; max-height: 150px; overflow: auto;">
					<div style="width: 600px; height: 600px;" />
				</v-sheet>
			`,
		});

		shallowMount(TestComponent, { localVue }).destroy();
	});
});
