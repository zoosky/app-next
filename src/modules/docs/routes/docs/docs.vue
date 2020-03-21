<template>
	<private-view title="Documentation" header-dense :header-dense-auto="true">
		<iframe id="docs-frame" :src="url" title="docs" frameBorder="0"></iframe>

		<template #navigation>
			<v-list nav>
				<v-list-item
					v-for="shortcut in shortcuts"
					:key="shortcut.to"
					@click="onClick(shortcut.to)"
				>
					<v-list-item-icon><v-icon :name="shortcut.icon" /></v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ shortcut.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</template>
	</private-view>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';

export default defineComponent({
	name: 'docs',
	setup(props) {
		const shortcuts = [
			{
				name: 'Introduction',
				icon: 'info',
				to: 'https://docs.directus.io/'
			},
			{
				name: 'Getting started',
				icon: 'flight_takeoff',
				to: 'https://docs.directus.io/guides/user-guide.html'
			},
			{
				name: 'FAQ',
				icon: 'help',
				to:
					'https://docs.directus.io/getting-started/troubleshooting.html#frequently-asked-questions'
			}
		];

		const url = ref('https://docs.directus.io/');

		function onClick(to: string) {
			url.value = to;
		}

		return { shortcuts, onClick, url };
	}
});
</script>
<style lang="scss" scoped>
.private-view {
	--private-view-content-padding: 0 !important;

	main {
		#docs-frame {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
