<template>
	<div class="v-input" :class="{ 'full-width': fullWidth }">
		<div v-if="$slots['prepend-outer']" class="prepend-outer">
			<slot name="prepend-outer" :value="value" :disabled="disabled" />
		</div>
		<div class="input" :class="{ disabled, monospace }">
			<div v-if="$slots.prepend" class="prepend">
				<slot name="prepend" :value="value" :disabled="disabled" />
			</div>
			<span v-if="prefix" class="prefix">{{ prefix }}</span>
			<input
				v-bind="$attrs"
				v-focus="autofocus"
				v-on="_listeners"
				:disabled="disabled"
				:value="value"
			/>
			<span v-if="suffix" class="suffix">{{ suffix }}</span>
			<span v-if="($attrs.type === 'number')">
				<span
					class="step-up"
					:class="{
						disabled:
							value !== '' &&
							value !== null &&
							parseInt(value) === parseInt($attrs.max),
					}"
					@mousedown="stepUpListener"
				>
					<v-icon name="keyboard_arrow_up" />
				</span>
				<span
					class="step-down"
					:class="{
						disabled:
							value !== '' &&
							value !== null &&
							parseInt(value) === parseInt($attrs.min),
					}"
					@mousedown="stepDownListener"
				>
					<v-icon name="keyboard_arrow_down" />
				</span>
			</span>
			<div v-if="$slots.append" class="append">
				<slot name="append" :value="value" :disabled="disabled" />
			</div>
		</div>
		<div v-if="$slots['append-outer']" class="append-outer">
			<slot name="append-outer" :value="value" :disabled="disabled" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import slugify from '@sindresorhus/slugify';

export default defineComponent({
	inheritAttrs: false,
	props: {
		autofocus: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		prefix: {
			type: String,
			default: null,
		},
		suffix: {
			type: String,
			default: null,
		},
		monospace: {
			type: Boolean,
			default: false,
		},
		fullWidth: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [String, Number],
			default: null,
		},
		slug: {
			type: Boolean,
			default: false,
		},
		slugSeparator: {
			type: String,
			default: '-',
		},
	},
	setup(props, { emit, listeners, attrs }) {
		const _listeners = computed(() => ({
			...listeners,
			input: emitValue,
			change:
				attrs.type === 'number'
					? (e: MouseEvent) => emit('input', (e.target as HTMLInputElement).value)
					: listeners.change,
		}));

		return { _listeners, stepUpListener, stepDownListener };

		function emitValue(event: InputEvent) {
			let value = (event.target as HTMLInputElement).value;

			if (props.slug === true) {
				value = slugify(value, { separator: props.slugSeparator });
			}

			emit('input', value);
		}

		function stepUpListener(event: MouseEvent) {
			event.preventDefault();
			const target = event.target as HTMLInputElement;
			const input = target
				.closest('div')
				?.querySelector('input[type=number]') as HTMLInputElement;
			input.stepUp(parseInt(attrs.step) ?? 1);
			input.dispatchEvent(new Event('change'));
		}

		function stepDownListener(event: MouseEvent) {
			event.preventDefault();
			const target = event.target as HTMLInputElement;
			const input = target
				.closest('div')
				?.querySelector('input[type=number]') as HTMLInputElement;
			input.stepDown(parseInt(attrs.step) ?? 1);
			input.dispatchEvent(new Event('change'));
		}
	},
});
</script>

<style lang="scss" scoped>
.v-input {
	--arrow-color: var(--border-normal);

	display: flex;
	align-items: center;
	width: max-content;
	height: var(--input-height);

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		margin: 0;
		-webkit-appearance: none;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.prepend-outer {
		margin-right: 8px;
	}

	.input {
		display: flex;
		flex-grow: 1;
		align-items: center;
		height: 100%;
		padding: var(--input-padding);
		color: var(--foreground-normal);
		background-color: var(--background-page);
		border: var(--border-width) solid var(--border-normal);
		border-radius: var(--border-radius);
		transition: border-color var(--fast) var(--transition);

		.prepend {
			margin-right: 8px;
		}

		.step-up {
			margin-bottom: -8px;
		}

		.step-down {
			margin-top: -8px;
		}

		.step-up,
		.step-down {
			display: block;
			color: var(--arrow-color);
			cursor: pointer;

			&:active:not(.disabled) {
				transform: scale(0.9);
			}

			&.disabled {
				--arrow-color: var(--border-normal);

				cursor: auto;
			}
		}

		&:hover {
			--arrow-color: var(--border-normal-alt);

			color: var(--foreground-normal);
			background-color: var(--background-page);
			border-color: var(--border-normal-alt);
		}

		&:focus-within {
			--arrow-color: var(--primary);

			color: var(--foreground-normal);
			background-color: var(--background-page);
			border-color: var(--primary);
		}

		&.disabled {
			--arrow-color: var(--border-normal);

			color: var(--foreground-subdued);
			background-color: var(--background-subdued);
			border-color: var(--border-normal);
		}

		input {
			flex-grow: 1;
			height: 100%;
			background-color: transparent;
			border: none;
			appearance: none;

			&::placeholder {
				color: var(--foreground-subdued);
			}
		}

		&.monospace {
			input {
				font-family: var(--family-monospace);
			}
		}

		.prefix,
		.suffix {
			color: var(--foreground-subdued);
		}

		.append {
			margin-left: 8px;
		}
	}

	.append-outer {
		margin-left: 8px;
	}

	&.full-width {
		width: 100%;

		.input {
			width: 100%;
		}
	}
}
</style>
