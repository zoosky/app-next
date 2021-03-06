<template>
	<div class="filter-input">
		<template v-if="['between', 'nbetween'].includes(operator)">
			<v-input :type="type" :value="csvValue[0]" @input="setCSV(0, $event)" full-width>
				<template #append>
					<v-icon name="vertical_align_top" />
				</template>
			</v-input>
			<v-input :type="type" :value="csvValue[1]" @input="setCSV(1, $event)" full-width>
				<template #append>
					<v-icon name="vertical_align_bottom" />
				</template>
			</v-input>
		</template>
		<template v-else-if="['in', 'nin'].includes(operator)">
			<v-input
				v-for="(val, index) in csvValue"
				:key="index"
				:value="val"
				:type="type"
				@input="setCSV(index, $event)"
				full-width
			>
				<template #append>
					<v-icon v-if="csvValue.length > 1" name="close" @click="removeCSV(val)" />
				</template>
			</v-input>
			<v-button outlined dashed full-width @click="addCSV">
				<v-icon name="add" />
				{{ $t('add_new') }}
			</v-button>
		</template>
		<template v-else-if="['empty', 'nempty'].includes(operator) === false">
			<v-checkbox v-if="type === 'checkbox'" :inputValue="_value" />
			<v-input v-else v-model="_value" :type="type" full-width />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import { FilterOperator } from '@/stores/collection-presets/types';

export default defineComponent({
	props: {
		value: {
			type: String,
			required: true,
		},
		type: {
			type: String as PropType<'text' | 'checkbox' | 'number' | 'datetime' | 'unknown'>,
			required: true,
		},
		operator: {
			type: String as PropType<FilterOperator>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const _value = computed<string | string[]>({
			get() {
				return props.value;
			},
			set(newValue) {
				emit('input', newValue);
			},
		});

		const csvValue = computed({
			get() {
				return (props.value || '').split(',');
			},
			set(newVal: string[]) {
				_value.value = newVal.join(',');
			},
		});

		return { _value, csvValue, setCSV, removeCSV, addCSV };

		function setCSV(index: number, value: string) {
			const newValue = Object.assign([], csvValue.value, { [index]: value });
			csvValue.value = newValue;
		}

		function removeCSV(val: string) {
			csvValue.value = csvValue.value.filter((value) => value !== val);
		}

		function addCSV() {
			csvValue.value = [...csvValue.value, ''];
		}
	},
});
</script>

<style lang="scss" scoped>
.v-input + .v-input,
.v-input + .v-button {
	margin-top: 8px;
}

.v-input .v-icon {
	--v-icon-color: var(--foreground-subdued);
}
</style>
