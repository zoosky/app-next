<template>
	<div class="card">
		<div class="header">
			<v-icon :name="icon" />
		</div>
		<div class="title" v-if="$slots.title"><slot name="title" /></div>
		<div class="subtitle"><slot name="subtitle" /></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	props: {
		icon: {
			type: String,
			default: 'box',
		},
	},
});
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--size);
	height: var(--size);
	background-color: var(--background-normal);
	border-radius: var(--border-radius);
	overflow: hidden;

	.v-icon {
		--v-icon-color: var(--foreground-subdued);
	}
}

.title, .subtitle {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
}

.subtitle {
	color: var(--foreground-subdued);
}
</style>
