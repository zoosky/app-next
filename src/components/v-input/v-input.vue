<template>
	<div class="v-input" :class="{ 'full-width': fullWidth }">
		<div v-if="$slots['prepend-outer']" class="prepend-outer">
			<slot name="prepend-outer" :value="value" :disabled="disabled" />
		</div>
		<div class="input" :class="[font, { disabled }]">
			<div v-if="$slots.prepend" class="prepend">
				<slot name="prepend" :value="value" :disabled="disabled" />
			</div>
			<span v-if="prefix" class="prefix">{{ prefix }}</span>
			<input
				v-bind="$attrs"
				v-focus="autofocus"
				v-on="_listeners"
				:type="masked ? 'password' : 'text'"
				:disabled="disabled"
				:value="value"
			/>
			<span v-if="suffix" class="suffix">{{ suffix }}</span>
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
import { defineComponent, computed, PropType } from '@vue/composition-api';
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
		font: {
			type: String as PropType<'sans-serif' | 'serif' | 'monospace'>,
			default: 'sans-serif',
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
		trim: {
			type: Boolean,
			default: true,
		},
		masked: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit, listeners }) {
		const _listeners = computed(() => ({
			...listeners,
			input: emitValue,
		}));

		return { _listeners };

		function emitValue(event: InputEvent) {
			let value = (event.target as HTMLInputElement).value;

			if (props.slug === true) {
				value = slugify(value, { separator: props.slugSeparator });
			} else if (props.trim === true) {
				value = value.trim();
			}

			emit('input', value);
		}
	},
});
</script>

<style lang="scss" scoped>
.v-input {
	display: flex;
	align-items: center;
	width: max-content;
	height: var(--input-height);

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

		&:hover {
			color: var(--foreground-normal);
			background-color: var(--background-page);
			border-color: var(--border-normal-alt);
		}

		&:focus-within {
			color: var(--foreground-normal);
			background-color: var(--background-page);
			border-color: var(--primary);
		}

		&.disabled {
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

		&.serif {
			input {
				font-family: var(--family-serif);
			}
		}

		&.sans-serif {
			input {
				font-family: var(--family-sans-serif);
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
