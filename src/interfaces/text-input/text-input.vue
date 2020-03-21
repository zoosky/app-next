<template>
	<v-input
		:monospace="monospace"
		:value="value"
		@input="$listeners.input"
		:placeholder="placeholder"
		full-width
	/>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null
		},
		monospace: {
			type: Boolean,
			default: false
		},
		trim: {
			type: Boolean,
			default: false
		},
		showCharacterCount: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: 'Enter a value...'
		}
	}
});
</script>
