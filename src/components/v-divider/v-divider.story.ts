import VDivider from './v-divider.vue';
import readme from './readme.md';
import withPadding from '../../../.storybook/decorators/with-padding';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { defineComponent } from '@vue/composition-api';
import VList, {
	VListItem,
	VListItemContent,
	VListItemTitle,
	VListItemIcon,
} from '@/components/v-list';
import VIcon from '@/components/v-icon/';

export default {
	title: 'Components / Divider',
	parameters: {
		notes: readme,
	},
	decorators: [withPadding, withKnobs],
};

export const basic = () =>
	defineComponent({
		components: { VDivider },
		props: {
			vertical: {
				default: boolean('Vertical', false),
			},
		},
		template: `
			<v-divider :vertical="vertical" />
		`,
	});

export const withText = () =>
	defineComponent({
		components: { VDivider },
		props: {
			vertical: {
				default: boolean('Vertical', false),
			},
		},
		template: `
			<v-divider :vertical="vertical">
				This is a divider.
			</v-divider>
		`,
	});

export const inList = () =>
	defineComponent({
		components: {
			VDivider,
			VList,
			VListItem,
			VListItemContent,
			VListItemIcon,
			VListItemTitle,
			VIcon,
		},
		props: {},
		template: `
			<v-sheet style="max-width: 200px">
				<v-list>
					<v-list-item v-for="n in 3" @click="() => {}">
						<v-list-item-icon><v-icon name="box" /></v-list-item-icon />
						<v-list-item-content>
							<v-list-item-title>Item {{ n }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-divider style="margin-top: 8px; margin-bottom: 8px;" />

					<v-list-item v-for="n in 1" @click="() => {}">
						<v-list-item-icon><v-icon name="box" /></v-list-item-icon />
						<v-list-item-content>
							<v-list-item-title>Item {{ n + 3 }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-divider style="margin-top: 8px; margin-bottom: 8px;" />

					<v-list-item v-for="n in 3" @click="() => {}">
						<v-list-item-icon><v-icon name="box" /></v-list-item-icon />
						<v-list-item-content>
							<v-list-item-title>Item {{ n + 4 }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-sheet>
		`,
	});
