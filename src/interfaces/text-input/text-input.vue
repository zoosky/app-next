<template>
	<div className="interface-text-input">
		<v-input
			:font="font"
			:value="value"
			:placeholder="placeholder"
			:disabled="readonly"
			:trim="trim"
			:type="masked ? 'password' : 'text'"
			full-width
			@input="$listeners.input"
		>
			<template v-if="iconLeft" #prepend><v-icon :name="iconLeft" /></template>
			<template v-if="iconRight" #append><v-icon :name="iconRight" /></template>
		</v-input>
	</div>
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
		masked: {
			type: Boolean,
			default: false,
		},
		iconLeft: {
			type: String,
			default: null,
		},
		iconRight: {
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
