<template>
	<div class="interface-toggle">
		<v-icon :name="icon" />
		<v-switch
			v-model="inputValue"
			:label="label"
			:style="color ? { '--v-switch-color': color } : null"
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
		const color = computed<string>(() => {
			return props.inputValue === true ? props.colorOn : props.colorOff;
		});
		return { icon, label, color };
	},
});
</script>
