<template>
	<div class="v-card" :class="{ disabled, tile }">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		tile: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
.v-card {
	--v-card-min-width: none;
	--v-card-max-width: 400px;
	--v-card-height: auto;
	--v-card-min-height: none;
	--v-card-max-height: min-content;
	--v-card-padding: 16px;
	--v-card-background-color: var(--background-subdued);

	min-width: var(--v-card-min-width);
	max-width: var(--v-card-max-width);
	height: var(--v-card-height);
	min-height: var(--v-card-min-height);
	max-height: var(--v-card-max-height);
	background-color: var(--v-card-background-color);
	border-radius: var(--border-radius);

	& > :first-child {
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}

	&.disabled {
		cursor: not-allowed;
		pointer-events: none;

		& > * {
			opacity: 0.4;
		}
	}

	&.tile {
		border-radius: 0;
	}
}
</style>
