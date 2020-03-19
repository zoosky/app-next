<template>
	<private-view title="Documentation" header-dense :header-dense-auto="false">
		<iframe id="docs-frame" src="https://docs.directus.io/" frameborder="0"></iframe>
	</private-view>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';

export default defineComponent({
	name: 'docs'
});
</script>
<style lang="scss" scoped>
.private-view {
	--private-view-content-padding: 0 !important;

	main {
		#docs-frame {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
}
</style>
