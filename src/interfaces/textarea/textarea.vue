<template>
	<v-textarea
		v-bind="{ placeholder, trim, font }"
		:value="value"
		:disabled="readonly"
		@input="$listeners.input"
		full-width
	/>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: null,
		},
		trim: {
			type: Boolean,
			default: true,
		},
		font: {
			type: String as PropType<'sans-serif' | 'serif' | 'monospace'>,
			default: 'sans-serif',
		},
	},
});
</script>
