# Select

Renders a dropdown input.

## Usage

```html
<v-select
	v-model="value"
	:items="[
		{
			text: 'Item 1',
			value: 'item-1',
		},
		{
			text: 'Item 2',
			value: 'item-2',
		},
	]"
/>
```

## Props

| Prop          | Description                                         | Default |
|---------------|-----------------------------------------------------|---------|
| `items`*      | Items to render in the select                       |         |
| `itemText`    | What item value to use for the display text         | `text`  |
| `itemValue`   | What item value to use for the item value           | `value` |
| `value`       | Currently selected item(s)                          |         |
| `multiple`    | Allow multiple items to be selected                 | `false` |
| `placeholder` | What placeholder to show when no items are selected |         |
| `full-width`  | Render the select at full width                     |         |
| `monospace`   | Render the value and options monospaced             |         |
| `disabled`    | Disable the select                                  |         |


## Events
| Event   | Description              | Value                                   |
|---------|--------------------------|-----------------------------------------|
| `input` | New value for the select | `(string | number)[] | string | number` |

## Slots
n/a

## CSS Variables
n/a
