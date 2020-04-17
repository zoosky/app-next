<template>
	<v-divider v-model="value" full-width />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
		color: {
			type: String,
			default: null,
		},
	},
});
</script>
