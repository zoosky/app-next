<template>
	<tr
		class="table-row"
		:class="{ subdued, clickable: hasClickListener }"
		@click="$emit('click', $event)"
	>
		<td v-if="showManualSort" class="manual cell">
			<v-icon
				name="drag_handle"
				class="drag-handle"
				:class="{ 'sorted-manually': sortedManually }"
			/>
		</td>
		<td v-if="showSelect" class="select cell" @click.stop>
			<v-checkbox :inputValue="isSelected" @change="toggleSelect" />
		</td>
		<td
			class="cell"
			:class="getClassesForCell(header)"
			v-for="header in headers"
			:key="header.value"
			:style="{ height: height + 'px', lineHeight: height + 'px' }"
		>
			<slot :name="`item.${header.value}`" :item="item">{{ item[header.value] }}</slot>
		</td>
	</tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Header } from '../types';

export default defineComponent({
	props: {
		headers: {
			type: Array as PropType<Header[]>,
			required: true
		},
		item: {
			type: Object,
			required: true
		},
		showSelect: {
			type: Boolean,
			default: false
		},
		showManualSort: {
			type: Boolean,
			default: false
		},
		isSelected: {
			type: Boolean,
			default: false
		},
		subdued: {
			type: Boolean,
			default: false
		},
		sortedManually: {
			type: Boolean,
			default: false
		},
		hasClickListener: {
			type: Boolean,
			default: false
		},
		height: {
			type: Number,
			default: 48
		}
	},
	setup(props, { emit }) {
		return { getClassesForCell, toggleSelect };

		function getClassesForCell(header: Header) {
			const classes: string[] = [];

			if (header.align) {
				classes.push(`align-${header.align}`);
			}

			return classes;
		}

		function toggleSelect() {
			emit('item-selected', {
				item: props.item,
				value: !props.isSelected
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.table-row {
	.cell {
		padding: 0 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: var(--input-background-color);
		border-bottom: 1px solid var(--divider-color);

		&.select,
		&.sort {
			display: flex;
			align-items: center;
		}
	}

	&.subdued .cell {
		opacity: 0.3;
	}

	&.clickable:not(.subdued):hover .cell {
		background-color: var(--highlight);
		cursor: pointer;
	}

	.drag-handle {
		--v-icon-color: var(--input-action-color-disabled);

		&:hover {
			.sorted-manually {
				--v-icon-color: var(--input-action-color);

				&:hover {
					--v-icon-color: var(--input-action-color-hover);

					cursor: ns-resize;
				}
			}
		}
	}
}
</style>