<template>
	<div class="v-badge" :class="{ dot, bordered }">
		<span class="badge" :class="{ dot, bordered, left, bottom }">
			<v-icon v-if="icon" :name="icon" :color="color" x-small />
			<span v-else>{{ value }}</span>
		</span>

		<slot></slot>
	</div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, Ref } from '@vue/composition-api';

export default createComponent({
	props: {
		value: {
			type: String,
			default: null
		},
		dot: {
			type: Boolean,
			default: false
		},
		left: {
			type: Boolean,
			default: false
		},
		bottom: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: null
		},
		bordered: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style lang="scss" scoped>
.v-badge {
	--v-badge-color: var(--white);
	--v-badge-background-color: var(--danger);
	--v-badge-border-color: var(--background-color);
	--v-badge-offset-x: 0px;
	--v-badge-offset-y: 0px;
	--v-badge-size: 20px;

	position: relative;
	display: inline-block;

	&.bordered {
		--v-badge-size: 24px;
	}

	&.dot {
		--v-badge-size: 12px;

		&.bordered {
			--v-badge-size: 16px;
		}
	}

	.badge {
		position: absolute;
		top: calc(var(--v-badge-size) / -2 + var(--v-badge-offset-y));
		right: calc(var(--v-badge-size) / -2 + var(--v-badge-offset-x));
		z-index: 10;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: max-content;
		min-width: var(--v-badge-size);
		height: var(--v-badge-size);
		padding: 0 4px;
		color: var(--v-badge-color);
		font-size: 12px;
		background-color: var(--v-badge-background-color);
		border-radius: calc(var(--v-badge-size) / 2);

		&.left {
			right: unset;
			left: calc(var(--v-badge-size) / -2 + var(--v-badge-offset-x));
		}

		&.bottom {
			top: unset;
			bottom: calc(var(--v-badge-size) / -2 + var(--v-badge-offset-y));
		}

		&.dot * {
			display: none;
		}

		&.bordered {
			border: 2px solid var(--v-badge-border-color);
		}
	}
}
</style>