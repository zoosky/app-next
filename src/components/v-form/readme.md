# Form
Renders a form using interfaces based on the passed collection name.

## Usage
```html
<v-form
	collection="articles"
	:edits.sync="{}"
	:initial-values="{
		title: 'Hello World'
	}"
/>
```

## Props
| Prop             | Description                                                                         | Default | Type                              |
|------------------|-------------------------------------------------------------------------------------|---------|-----------------------------------|
| `collection`*    | The collection of which you want to render the fields                               |         | `String`                          |
| `edits`          | The edits that were made after the form was rendered. Supports the `.sync` modifier | `null`  | `Object as PropType<FieldValues>` |
| `initial-values` | Object of the starting values of the fields                                         | `null`  | `Object as PropType<FieldValues>` |

## Slots
n/a

## Events
| Event          | Description                                                              | Value |
|----------------|--------------------------------------------------------------------------|-------|
| `input`        |                                                                          |       |
<!-- | `update:edits` | Update the edits state. Enables the `.sync` modifier on the `edits` prop |       | -->

## CSS Variables
| Variable                  | Default                                |
|---------------------------|----------------------------------------|
| `--v-form-column-width`   | `300px`                                |
| `--v-form-row-max-height` | `calc(var(--v-form-column-width) * 2)` |
| `--v-form-horizontal-gap` | `12px`                                 |
| `--v-form-vertical-gap`   | `52px`                                 |
