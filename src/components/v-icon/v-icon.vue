<template>
	<span
		class="v-icon"
		:class="[sizeClass, { 'has-click': hasClick, left, right }]"
		:role="hasClick ? 'button' : null"
		@click="emitClick"
	>
		<component v-if="customIconName" :is="customIconName" />
		<i v-else :class="{ outline }">{{ name }}</i>
	</span>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import useSizeClass, { sizeProps } from '@/compositions/size-class';

import CustomIconBox from './custom-icons/box.vue';
import CustomIconSignalWifi1Bar from './custom-icons/signal_wifi_1_bar.vue';
import CustomIconSignalWifi2Bar from './custom-icons/signal_wifi_2_bar.vue';
import CustomIconSignalWifi3Bar from './custom-icons/signal_wifi_3_bar.vue';

const customIcons: string[] = [
	'box',
	'signal_wifi_1_bar',
	'signal_wifi_2_bar',
	'signal_wifi_3_bar',
];

export default defineComponent({
	components: {
		CustomIconBox,
		CustomIconSignalWifi1Bar,
		CustomIconSignalWifi2Bar,
		CustomIconSignalWifi3Bar,
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		outline: {
			type: Boolean,
			default: false,
		},
		sup: {
			type: Boolean,
			default: false,
		},
		left: {
			type: Boolean,
			default: false,
		},
		right: {
			type: Boolean,
			default: false,
		},
		...sizeProps,
	},

	setup(props, { emit, listeners }) {
		const sizeClass = computed<string | null>(() => {
			if (props.sup) return 'sup';
			return useSizeClass(props).value;
		});

		const customIconName = computed<string | null>(() => {
			if (customIcons.includes(props.name))
				return `custom-icon-${props.name}`.replace(/_/g, '-');
			return null;
		});

		const hasClick = computed<boolean>(() => listeners.hasOwnProperty('click'));

		return {
			sizeClass,
			customIconName,
			hasClick,
			emitClick,
		};

		function emitClick(event: MouseEvent) {
			emit('click', event);
		}
	},
});
</script>

<style lang="scss" scoped>
.v-icon {
	--v-icon-color: currentColor;
	--v-icon-size: 24px;

	position: relative;
	display: inline-block;
	width: var(--v-icon-size);
	min-width: var(--v-icon-size);
	height: var(--v-icon-size);
	color: var(--v-icon-color);
	font-size: 0;
	vertical-align: middle;

	i {
		display: block;
		font-weight: normal;
		font-size: var(--v-icon-size);
		/* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
		font-family: 'Material Icons';
		font-style: normal;
		line-height: 1;
		letter-spacing: normal;
		white-space: nowrap;
		text-transform: none;
		word-wrap: normal;
		font-feature-settings: 'liga';

		&.outline {
			/* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
			font-family: 'Material Icons Outline';
		}
	}

	svg {
		display: inline-block;
		color: inherit;
		fill: currentColor;
	}

	&.has-click {
		cursor: pointer;
	}

	&.sup {
		--v-icon-size: 8px;

		vertical-align: 5px;
	}

	&.x-small {
		--v-icon-size: 12px;
	}

	&.small {
		--v-icon-size: 18px;
	}

	&.large {
		--v-icon-size: 36px;
	}

	&.x-large {
		--v-icon-size: 48px;
	}

	&.left {
		margin-right: 8px;
		margin-left: -4px;
	}

	&.right {
		margin-right: -4px;
		margin-left: 8px;
	}
}
</style>
