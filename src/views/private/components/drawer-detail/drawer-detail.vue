<template>
	<div class="drawer-detail">
		<button class="toggle" @click="toggle" :class="{ open: active }">
			<div class="icon">
				<v-icon :name="icon" />
			</div>
			<div class="title" v-show="drawerOpen">
				{{ title }}
			</div>
		</button>
		<transition-expand>
			<div v-show="active">
				<div class="content">
					<slot />
				</div>
			</div>
		</transition-expand>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from '@vue/composition-api';
import { useGroupable } from '@/compositions/groupable';

export default defineComponent({
	props: {
		icon: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const { active, toggle } = useGroupable(props.title);
		const drawerOpen = inject('drawer-open', ref(false));
		return { active, toggle, drawerOpen };
	}
});
</script>

<style lang="scss" scoped>
.drawer-detail {
	.toggle {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 64px;
		color: var(--foreground-color);
		transition: background-color var(--fast) var(--transition);

		&:not(.open):hover {
			background-color: var(--background-color-hover);
		}

		&.open {
			background-color: var(--background-color-active);
		}
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		margin-right: 12px;
		padding: 20px;
		padding-right: 0;
	}

	.content {
		padding: 12px;
	}
}
</style>