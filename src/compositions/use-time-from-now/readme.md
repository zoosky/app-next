# `useTimeFromNow(date: Date | number, autoUpdate: number = 60000): Ref<string>
Composition that can be used to create a relative time format that is auto updated every `autoUpdate`
milliseconds.

## Usage
```js
import { defineComponent } from '@vue/composition-api';
import { useTimeFromNow } from '@/compositions/use-time-from-now';

export default defineComponent({
	setup(props) {
		const timeFromNow = useTimeFromNow(Date.now());
		return { timeFromNow };
	}
});
```