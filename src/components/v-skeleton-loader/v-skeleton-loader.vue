<template functional>
	<transition name="fade">
		<div class="v-skeleton-loader" :class="props.type">
			<template v-if="props.type === 'list-item-icon'">
				<div class="icon" />
				<div class="text" />
			</template>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	props: {
		type: {
			type: String,
			default: 'input',
			validator: (type: string) => ['input', 'input-tall', 'list-item-icon'].includes(type),
		},
	},
});
</script>

<style lang="scss" scoped>
.v-skeleton-loader {
	--v-skeleton-loader-color: var(--background-page);
	--v-skeleton-loader-background-color: var(--background-subdued);

	position: relative;
	overflow: hidden;
	cursor: progress;
}

@mixin loader {
	position: relative;
	overflow: hidden;
	background-color: var(--v-skeleton-loader-background-color);

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 1;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			var(--v-skeleton-loader-color),
			transparent
		);
		transform: translateX(-100%);
		opacity: 0.5;
		animation: loading 1.5s infinite;
		content: '';
	}

	@keyframes loading {
		100% {
			transform: translateX(100%);
		}
	}
}

.input,
.input-tall {
	width: 100%;
	height: var(--input-height);
	border: var(--border-width) solid var(--v-skeleton-loader-background-color);
	border-radius: var(--border-radius);

	@include loader;
}

.input-tall {
	height: var(--input-height-tall);
}

.list-item-icon {
	display: flex;
	align-items: center;
	width: 100%;
	height: 46px;

	.icon {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		margin-right: 12px;
		border-radius: 50%;

		@include loader;
	}

	.text {
		flex-grow: 1;
		height: 12px;
		border-radius: 6px;

		@include loader;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--medium) var(--transition);
}

.fade-enter,
.fade-leave-to {
	position: absolute;
	opacity: 0;
}
</style>
