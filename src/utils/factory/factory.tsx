import { defineComponent, createElement, reactive, ref, toRefs } from '@vue/composition-api';
import Vue, { VueConstructor } from 'vue';
import { defineInterface } from '@/interfaces/define';
import {
	InterfaceDefineParam,
	InterfaceDefineParamGeneric,
	InterfaceConfig,
} from '@/interfaces/types';
import { Data } from '@vue/composition-api/dist/component';

export function componentFactory(
	base: VueConstructor<Vue>,
	displayComponent: string
): VueConstructor<Vue> {
	return defineComponent({
		setup() {
			// return () => <component :is="base" v-bind="{displayComponent, ...$props}" v-on="$listeners">$slots</component>;
			// createElement(
			// 	base,
			// 	{
			// 		props: newProps,
			// 		on: listeners,
			// 	},
			// 	children
			// );
		},
	});
}

export function interfaceFactory(
	base: VueConstructor<Vue>,
	displayComponent: string,
	id: string,
	config: InterfaceDefineParamGeneric<Omit<InterfaceConfig, 'component'>>
): InterfaceConfig {
	let newConfig: InterfaceDefineParam;
	if (typeof config === 'function') {
		newConfig = (context) => {
			const resConfig = config(context);
			return {
				...resConfig,
				id: resConfig.id + '-' + id,
				// name: resConfig.name ??
				component: componentFactory(base, displayComponent),
			};
		};
	} else {
		newConfig = {
			...config,
			id: config.id + '-' + id,
			// name: resConfig.name ??
			component: componentFactory(base, displayComponent),
		};
	}

	return defineInterface(newConfig);
}
