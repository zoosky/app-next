import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { throttle } from 'lodash';

export { ScrollOptions, ScrollType };

type ScrollOptions = {
	callback: (eventType: ScrollType) => {};
	thresholdTop: number;
	thresholdBottom: number;
};

enum ScrollType {
	TOP_ENTER,
	TOP_LEAVE,
	BOTTOM_ENTER,
	BOTTOM_LEAVE
}

const Scroll: DirectiveOptions = {
	bind(element, binding, vnode) {
		const options: ScrollOptions = binding.value;
		if (!options) return;

		if (!options.thresholdBottom) options.thresholdBottom = 15;
		if (!options.thresholdTop) options.thresholdTop = 15;

		let reachedTop = true;
		let reachedBottom = false;

		element.onscroll = throttle(event => {
			const { scrollTop, scrollHeight, offsetHeight } = event.target;
			const maxHeight = scrollHeight - offsetHeight;

			if (scrollTop <= options.thresholdTop) {
				if (!reachedTop) {
					options.callback(ScrollType.TOP_ENTER);
					reachedTop = true;
				}
			} else if (maxHeight - scrollTop <= options.thresholdBottom) {
				if (!reachedBottom) {
					options.callback(ScrollType.BOTTOM_ENTER);
					reachedBottom = true;
				}
			} else {
				if (reachedTop) {
					options.callback(ScrollType.TOP_LEAVE);
				}
				if (reachedBottom) {
					options.callback(ScrollType.BOTTOM_LEAVE);
				}

				reachedTop = false;
				reachedBottom = false;
			}
		}, 50);
	}
};

export default Scroll;
