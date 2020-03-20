import Vue from 'vue';
import VButton from '../../components/v-button';
import VIcon from '../../components/v-icon';
import markdown from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { action } from '@storybook/addon-actions';
import { ScrollType } from './scroll';

Vue.component('v-button', VButton);
Vue.component('v-icon', VIcon);

export default {
	title: 'Directives / Scroll',
	decorators: [withPadding],
	parameters: {
		notes: markdown
	}
};

export const vertical = () => ({
	methods: {
		onScroll: (eventType: ScrollType) => {
			console.log(eventType.toString());

			action('onScroll', { allowFunction: false });
		}
	},
	template: `
		<div style="overflow-y: scroll; height: 100%; width: 50%" v-scroll="{callback: onScroll}">
			<div style="height: 400vh; width: 100%; background: linear-gradient(125deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);"></div>
        </div>
	`
});

export const horrizontal = () => ({
	methods: {
		onScroll: (eventType: ScrollType) => {
			console.log(eventType);

			action('onScroll', { allowFunction: false });
		}
	},
	template: `
		<div style="overflow-x: scroll; height: 100%; width: 50%" v-scroll="{callback: onScroll}">
			<div style="height: 100%; width: 400vw; background: linear-gradient(125deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);"></div>
        </div>
	`
});
