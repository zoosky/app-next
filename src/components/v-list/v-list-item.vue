<template>
	<component
		:is="component"
		active-class="active"
		class="v-list-item"
		:to="to"
		:class="{
			active,
			dense,
			link: isClickable,
			'three-line': lines === 3,
			'two-line': lines === 2,
			'one-line': lines === 1,
			disabled,
		}"
		v-on="disabled === false && $listeners"
	>
		<slot></slot>
	</component>
</template>

<script lang="ts">
import { Location } from 'vue-router';
import { defineComponent, PropType, computed } from '@vue/composition-api';

export default defineComponent({
	props: {
		dense: {
			type: Boolean,
			default: false,
		},
		lines: {
			type: Number as PropType<1 | 2 | 3>,
			default: null,
		},
		to: {
			type: [String, Object] as PropType<string | Location>,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { listeners }) {
		const component = computed<string>(() => (props.to ? 'router-link' : 'li'));
		const isClickable = computed(() => Boolean(props.to || listeners.click !== undefined));
		return { component, isClickable };
	},
});
</script>

<style lang="scss" scoped>
.v-list-item {
	$this: &;

	--v-list-item-one-line-min-height: 40px;
	--v-list-item-two-line-min-height: 52px;
	--v-list-item-three-line-min-height: 64px;
	--v-list-item-one-line-min-height-dense: 32px;
	--v-list-item-two-line-min-height-dense: 36px;
	--v-list-item-three-line-min-height-dense: 52px;
	--v-list-item-padding: 0 16px 0 calc(16px + var(--v-list-item-indent, 0px));
	--v-list-item-padding-dense: 0 8px 0 calc(8px + var(--v-list-item-indent, 0px));
	--v-list-item-margin-dense: 2px 0;
	--v-list-item-min-width: none;
	--v-list-item-max-width: none;
	--v-list-item-min-height: var(--v-list-item-one-line-min-height);
	--v-list-item-max-height: auto;
	--v-list-item-border-radius: var(--border-radius);
	--v-list-item-margin-bottom: 0;
	--v-list-item-color: var(--v-list-color, var(--foreground-normal));
	--v-list-item-color-hover: var(--v-list-color-hover, var(--foreground-normal));
	--v-list-item-color-active: var(--v-list-color-active, var(--foreground-normal));
	--v-list-item-background-color-hover: var(
		--v-list-background-color-hover,
		var(--background-normal-alt)
	);
	--v-list-item-background-color-active: var(
		--v-list-background-color-active,
		var(--background-normal-alt)
	);

	position: relative;
	display: flex;
	flex-basis: 100%;
	flex-grow: 1;
	flex-shrink: 1;
	align-items: center;
	min-width: var(--v-list-item-min-width);
	max-width: var(--v-list-item-max-width);
	min-height: var(--v-list-item-min-height);
	max-height: var(--v-list-item-max-height);
	margin-bottom: var(--v-list-item-margin-bottom);
	padding: var(--v-list-item-padding);
	overflow: hidden;
	color: var(--v-list-item-color);
	text-decoration: none;
	border-radius: var(--v-list-item-border-radius);

	&.link {
		cursor: pointer;
		transition: var(--fast) var(--transition);
		transition-property: background-color, color;
		user-select: none;

		&:not(.disabled):hover {
			color: var(--v-list-item-color-hover);
			background-color: var(--v-list-item-background-color-hover);
		}

		&:not(.disabled):active,
		&.active {
			color: var(--v-list-item-color-active);
			background-color: var(--v-list-item-background-color-active);
		}
	}

	&.disabled {
		--v-list-item-color: var(--foreground-subdued);
	}

	@at-root {
		.v-list,
		#{$this},
		.v-list #{$this} {
			--v-list-item-min-height: var(--v-list-item-one-line-min-height);
			&.one-line {
				--v-list-item-min-height: var(--v-list-item-one-line-min-height);
			}
			&.two-line {
				--v-list-item-min-height: var(--v-list-item-two-line-min-height);
			}
			&.three-line {
				--v-list-item-min-height: var(--v-list-item-three-line-min-height);
			}
		}

		.v-list.dense {
			& #{$this} {
				--v-list-item-min-height: var(--v-list-item-one-line-min-height-dense);

				margin: var(--v-list-item-margin-dense);
				padding: var(--v-list-item-padding-dense);
				&.one-line {
					--v-list-item-min-height: var(--v-list-item-one-line-min-height-dense);
				}
				&.two-line {
					--v-list-item-min-height: var(--v-list-item-two-line-min-height-dense);
				}
				&.three-line {
					--v-list-item-min-height: var(--v-list-item-three-line-min-height-dense);
				}
			}
		}

		.v-list.nav {
			& #{$this} {
				--v-list-item-padding: 0 8px;
				--v-list-item-border-radius: 4px;
				&:not(:last-child):not(:only-child) {
					--v-list-item-margin-bottom: 4px;
				}
			}
			&.dense #{$this},
			#{$this}.dense {
				&:not(:last-child):not(:only-child) {
					--v-list-item-margin-bottom: 4px;
				}
			}
		}
	}
}
</style>
