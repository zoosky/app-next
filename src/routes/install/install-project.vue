<template>
	<div>
		<div class="type-title pane-title">{{ $t('project_info') }}</div>
		<div class="pane-content">
			<div class="pane-form">
				<div class="field">
					<div class="type-label label">{{ $t('project_name') }}</div>
					<v-input full-width v-model="_value.project_name" />
				</div>
				<div class="field">
					<div class="type-label label">{{ $t('project_key') }}</div>
					<v-input slug monospace full-width v-model="_value.project" />
				</div>
				<div class="field">
					<div class="type-label label">{{ $t('admin_email') }}</div>
					<v-input full-width type="email" v-model="_value.user_email" />
				</div>
				<div class="field">
					<div class="type-label label">{{ $t('admin_password') }}</div>
					<v-input full-width type="password" v-model="_value.user_password" />
				</div>
			</div>
		</div>
		<div class="pane-buttons">
			<v-button secondary @click="$emit('prev')">{{ $t('back') }}</v-button>
			<v-button :disabled="nextEnabled === false" @click="$emit('next')">
				{{ $t('next') }}
			</v-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch } from '@vue/composition-api';
import slugify from '@sindresorhus/slugify';

type ProjectInfo = {
	project_name: string | null;
	project: string | null;
	user_email: string | null;
	user_password: string | null;
};

export default defineComponent({
	props: {
		value: {
			type: Object as PropType<ProjectInfo>,
			required: true,
		},
	},
	setup(props, { emit }) {
		const _value = computed<ProjectInfo>({
			get() {
				return props.value;
			},
			set(newValue) {
				emit('input', newValue);
			},
		});

		watch(
			() => _value.value.project_name,
			(newValue) => {
				if (newValue) {
					_value.value = {
						..._value.value,
						project: slugify(newValue),
					};
				}
			}
		);

		const nextEnabled = computed<boolean>(() => {
			const requiredKeys: (keyof ProjectInfo)[] = [
				'project_name',
				'project',
				'user_email',
				'user_password',
			];

			return !!requiredKeys.every(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				(key) => _value.value[key] && _value.value[key]!.length > 0
			);
		});

		return { _value, nextEnabled };
	},
});
</script>
