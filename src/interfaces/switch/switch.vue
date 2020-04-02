<template>
	<div class="interface-switch">
		<v-checkbox v-if="checkbox" v-model="inputValue" :label="label" :disabled="readonly" />
		<v-switch v-else v-model="inputValue" :label="label" :disabled="readonly" />
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
		readonly: {
			type: Boolean,
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
		checkbox: {
			type: Boolean,
			default: false,
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
