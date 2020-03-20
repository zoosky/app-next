# Scroll

The scroll directive triggers custom events when reaching the top or bottom of a sertain scrollable area.

```html
<div style="overflow-y: scroll; height: 100%; width: 50%" v-scroll="{callback: onScroll}">
    <div style="height: 400vh; width: 100%;"></div>
</div>
<script>
import {ScrollType} from 'scroll directive location'

function onScroll(eventType: ScrollType) {
    console.log("Scroll event is: ", eventType)
}

</script>
```

## Value

The object passed to the directive is called the value. The directive can be configured with the following options.
Note that a callback is required to recieve any events.

| Options           | Description                                                                                                                    | Default |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| `callback`        | The main callback, that gets called whenever one of `TOP_ENTER`, `TOP_LEAVE`, `BOTOM_ENTER`, `BOTTOM_LEAVE` events takes place | --      |
| `thresholdTop`    | the distance in px which the scrollbar is seen as `at the top`                                                                 | `15`    |
| `thresholdBottom` | the distance in px which the scrollbar is seen as `at the bottom`                                                              | `15`    |

## Events

There are 4 given events on which the callback gets triggered.

| Event          | Description                                                         |
|----------------|---------------------------------------------------------------------|
| `TOP_ENTER`    | Tiggered when the scroll value is beneath the given thresholdTop    |
| `TOP_LEAVE`    | Tiggered when the scroll value is above the given top thresholdTop  |
| `BOTTOM_ENTER` | Tiggered when the scroll value is beneath the given thresholdBottom |
| `BOTTOM_LEAVE` | Tiggered when the scroll value is above the given thresholdBottom   |