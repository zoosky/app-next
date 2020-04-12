<template>
	<div class="interface-toggle">
		<v-checkbox
			v-model="inputValue"
			:style="[
				colorOn ? { '--v-checkbox-color': `var(--${colorOn}, ${colorOn})` } : null,
				colorOff ? { '--v-checkbox-color-off': `var(--${colorOff}, ${colorOff})` } : null,
			]"
			v-bind="{ iconOn, iconOff, label }"
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
		iconOn: {
			type: String,
			default: null,
		},
		iconOff: {
			type: String,
			default: null,
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
		const icon = computed<string>(() => {
			return props.inputValue === true ? props.iconOn : props.iconOff;
		});
		const label = computed<string>(() => {
			return props.inputValue === true ? props.labelOn : props.labelOff;
		});

		return { icon, label };
	},
});
</script>
