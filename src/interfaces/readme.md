# Interfaces

Interfaces are the individual blocks that allow editing and viewing individual pieces of data. They
can be seen as the individual fields in a form, where the field is a single column in a table.

## Defining interfaces

Interfaces need to be defined through the `defineInterface` function. This allows the interface to
register things like its name and options. It takes either a config object, or a function that takes in context and returns a config object.

```js
export default defineInterface(({ i18n }) => ({
	id: 'text-input',
	name: i18n.t('interfaces.text-input.text-input'),
	icon: 'box',
	component: InterfaceTextInput,
	options: [
		{
			field: 'monospace',
			name: 'Monospace',
			width: 'half',
			interface: 'switch',
		},
		{
			field: 'placeholder',
			name: 'Placeholder',
			width: 'half',
			interface: 'text-input',
		},
	],
}));
```

### `context`

The one parameter that the define function can take is `context`. Context holds the following properties:

| Property | Description                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `i18n`   | The internal vue-i18n instance. Can be used to return a translated name or translated interface options |

### `id`

Unique ID for the interface within the platform. This is not shown to the end user, but is used
internally to build up forms and layouts.

#### `name`

The user-facing name of the interface. By using the `i18n` handler from context, you can make this
localized.

#### `icon`

The icon that's shown when refering to this interface. It's most prominent usage is in the field-setup
wizard.

#### `component`

The Vue component that makes up the input of the interface. This is the component that will be rendered
in the edit form.

### `options`

A list of field options
