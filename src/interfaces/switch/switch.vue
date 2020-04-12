<template>
	<div class="interface-switch">
		<v-switch v-model="inputValue" :label="label" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
	model: {
		prop: 'inputValue',
		event: 'change',
	},
	props: {
		value: {
			type: String,
			default: null,
		},
		inputValue: {
			type: [Boolean, Array],
			default: false,
		},
		labelOn: {
			type: String,
			default: null,
		},
		labelOff: {
			type: String,
			default: null,
		},
	},
	setup(props) {
		const label = computed<string>(() => {
			if (props.inputValue instanceof Array) {
				return props.inputValue.includes(props.value) ? props.labelOn : props.labelOff;
			}
			return props.inputValue === true ? props.labelOn : props.labelOff;
		});
		return { label };
	},
});
</script>
