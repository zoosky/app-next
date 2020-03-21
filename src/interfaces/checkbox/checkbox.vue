<template>
	<v-checkbox
		@change="onChange"
		:inputValue="checked"
		:label="label"
		:disabled="disabled"
		:indeterminate="indeterminate"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';

export default defineComponent({
	props: {
		value: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: undefined
		},
		disabled: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		const checked = ref(props.value);

		function onChange(event: boolean) {
			checked.value = event;
			emit('input', event);
		}

		return { onChange, checked };
	}
});
</script>
