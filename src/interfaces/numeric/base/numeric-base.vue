<template>
	<div class="interface-numeric">
		<component
			:is="displayComponent"
			type="number"
			:font="font"
			:value="value"
			:placeholder="placeholder"
			:disabled="readonly"
			:min="minValue"
			:max="maxValue"
			:step="stepInterval"
			full-width
			@input="$listeners.input"
		>
			<template v-if="iconLeft" #prepend>
				<v-icon :name="iconLeft" />
			</template>
			<template v-if="iconRight" #append>
				<v-icon :name="iconRight" />
			</template>
		</component>
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
		minValue: {
			type: Number,
			default: '',
		},
		maxValue: {
			type: Number,
			default: '',
		},
		stepInterval: {
			type: Number,
			default: 1,
		},
		iconLeft: {
			type: String,
			default: null,
		},
		iconRight: {
			type: String,
			default: null,
		},
		font: {
			type: String as PropType<'sans-serif' | 'serif' | 'monospace'>,
			default: 'sans-serif',
		},
		displayComponent: {
			type: String,
			required: true,
		},
	},
});
</script>
