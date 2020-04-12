<template>
	<div class="interface-switch">
		<v-switch
			v-model="inputValue"
			:label="label"
			:style="[
				colorOn ? { '--v-switch-color': `var(--${colorOn}, ${colorOn})` } : null,
				colorOff ? { '--v-switch-color-off': `var(--${colorOff}, ${colorOff})` } : null,
			]"
		/>
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
		colorOn: {
			type: String,
			default: null,
		},
		colorOff: {
			type: String,
			default: null,
		},
	},
	setup(props) {
		const label = computed<string>(() => {
			return props.inputValue === true ? props.labelOn : props.labelOff;
		});
		return { label };
	},
});
</script>
