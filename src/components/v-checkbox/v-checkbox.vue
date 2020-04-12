<template>
	<button
		class="v-checkbox"
		@click="toggleInput"
		type="button"
		role="checkbox"
		:aria-pressed="isChecked ? 'true' : 'false'"
		:disabled="disabled"
		:class="{ checked: isChecked }"
	>
		<v-icon :name="icon" :outline="outline" />
		<span class="label type-label">
			<slot name="label">{{ label }}</slot>
		</span>
	</button>
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
		label: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		indeterminate: {
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
		iconIndet: {
			type: String,
			default: null,
		},
		// Way to check if icon string is valid / have a fallback on render?
	},
	setup(props, { emit }) {
		const isChecked = computed<boolean>(() => {
			if (props.inputValue instanceof Array) {
				return props.inputValue.includes(props.value);
			}

			return props.inputValue === true;
		});

		const iconOn = computed<string>(() => {
			return !!props.iconOn ? props.iconOn : 'check_box';
		});

		const iconOff = computed<string>(() => {
			return !!props.iconOff ? props.iconOff : 'check_box_outline_blank';
		});

		const outline = computed<boolean>(() => {
			return !!props.iconOff && !isChecked.value;
		});

		const iconIndet = computed<string>(() => {
			return !!props.iconIndet ? props.iconIndet : 'indeterminate_check_box';
		});

		const icon = computed<string>(() => {
			if (props.indeterminate) return iconIndet.value;
			return isChecked.value ? iconOn.value : iconOff.value;
		});

		return { isChecked, toggleInput, icon, outline };

		function toggleInput(): void {
			if (props.indeterminate) {
				emit('update:indeterminate', false);
			}

			if (props.inputValue instanceof Array) {
				const newValue = [...props.inputValue];

				if (isChecked.value === false) {
					newValue.push(props.value);
				} else {
					newValue.splice(newValue.indexOf(props.value), 1);
				}

				emit('change', newValue);
			} else {
				emit('change', !isChecked.value);
			}
		}
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/no-wrap';

.v-checkbox {
	--v-checkbox-color: var(--foreground-normal);
	--v-checkbox-color-off: var(--border-normal);

	display: flex;
	align-items: center;
	font-size: 0;
	text-align: left;
	background-color: transparent;
	border: none;
	border-radius: 0;
	appearance: none;

	.label:not(:empty) {
		margin-left: 8px;

		@include no-wrap;
	}

	& .v-icon {
		--v-icon-color: var(--v-checkbox-color-off);
	}

	&:disabled {
		cursor: not-allowed;

		.label {
			color: var(--foreground-subdued);
		}

		.v-icon {
			--v-icon-color: var(--border-normal);
		}
	}

	&:not(:disabled):hover {
		.v-icon {
			--v-icon-color: var(--border-normal);
		}
	}

	&:not(:disabled).checked {
		.v-icon {
			--v-icon-color: var(--v-checkbox-color);
		}
		.label {
			color: var(--v-checkbox-color);
		}
	}
}
</style>
