# Breadcrumb

```html
<v-breadcrumb :items="[{name: 'Collections', to: '/collections'}]" />
```

## Props
| Prop             | Description                                               | Default    | Type                              |
|------------------|-----------------------------------------------------------|------------|-----------------------------------|
| `items`          | An array of objects which information about each section  | `() => []` | `Array as PropType<Breadcrumb[]>` |
| `items.name`     | The name which will be displayed                          | `''`       |                                   |
| `items.to`       | The reroute link                                          | `''`       |                                   |
| `items.disabled` | If the router link should be clickable                    | `false`    |                                   |
| `items.icon`     | Displays an icon with the given name in front of the name | `''`       |                                   |
<!-- readme-gen-igonre: items.name, items.to, items.disabled, items.icon -->

## Events
n/a

## Slots
n/a

## CSS Variables
| Variable                        | Default                             |
|---------------------------------|-------------------------------------|
| `--v-breadcrumb-color`          | `var(--foreground-color-secondary)` |
| `--v-breadcrumb-color-hover`    | `var(--foreground-color)`           |
| `--v-breadcrumb-color-disabled` | `var(--foreground-color-tertiary)`  |
| `--v-breadcrumb-divider-color`  | `var(--foreground-color-tertiary)`  |
