# Checkbox

## Basic usage

```html
<v-checkbox v-model="checked" label="Receive newsletter" />
```

## Colors

The colors can be changed via the css variables `--v-checkbox-color` and `--v-checkbox-color-off`.

```html
<v-checkbox class="example-1" />
<v-checkbox class="example-2" />
<v-checkbox class="example-3" />
<v-checkbox class="example-4" />

<style>
	.example-1 {
		--v-checkbox-color: #abcabc;
	}

	.example-2 {
		--v-checkbox-color: rgba(125, 125, 198, 0.5);
	}

	.example-3 {
		--v-checkbox-color: var(--red);
	}

	.example-4 {
		--v-checkbox-color: var(--border-normal);
	}
</style>
```

## Boolean vs arrays

Just as with checkboxes, you can use `v-model` with both an array and a boolean:

```html
<template>
	<v-checkbox v-model="withBoolean" />

	<v-checkbox v-model="withArray" value="red" />
	<v-checkbox v-model="withArray" value="blue" />
	<v-checkbox v-model="withArray" value="green" />
</template>

<script>
	export default {
		data() {
			return {
				withBoolean: false,
				withArray: ['red', 'green'],
			};
		},
	};
</script>
```

Keep in mind to pass the `value` prop with a unique value when using arrays in `v-model`.

## Indeterminate

The indeterminate state can be set with the `indeterminate` prop. We recommend using the `.sync` modifier with the indeterminate prop, so the checkbox can set change it too:

```html
<v-checkbox :indeterminate.sync="indeterminate">
	<script>
		export default {
			data() {
				indeterminate: true;
			},
		};
	</script>
</v-checkbox>
```

If you can't, you should listen to the `update:indeterminate` event and respond to that:

```html
<v-checkbox indeterminate @update:indeterminate="setIndeterminate"></v-checkbox>
```

## Props

| Prop            | Description                                                                                            | Default |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| `value`         | Value for checkbox. Similar to value attr on checkbox type input in HTML                               | `--`    |
| `inputValue`    | Value that's used with `v-model`. Either boolean or array of values                                    | `false` |
| `label`         | Label for the checkbox                                                                                 | `--`    |
| `disabled`      | Disable the checkbox                                                                                   | `false` |
| `indeterminate` | Show the indeterminate state                                                                           | `false` |
| `iconOn`        | Icon for the on state. Else renders checkbox                                                           | `null`  |
| `iconOff`       | Icon for the off state. Automatically rendered in outline style (if available). Else renders empty box | `null`  |
| `iconIndet`     | Icon for the indeterminate state. Else renders indeterminate checkbox                                  | `null`  |

## Slots

| Slot    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| `label` | Allows custom markup and HTML to be rendered inside the label. Will override the `label` prop. |

## Events

| Event                  | Description                | Data                       |
| ---------------------- | -------------------------- | -------------------------- |
| `change`               | New state for the checkbox | Boolean or array of values |
| `update:indeterminate` | New state for the checkbox | Boolean or array of values |

## CSS Variables

| Variable                 | Default                    |
| ------------------------ | -------------------------- |
| `--v-checkbox-color`     | `var(--foreground-normal)` |
| `--v-checkbox-color-off` | `var(--border-normal)`     |
