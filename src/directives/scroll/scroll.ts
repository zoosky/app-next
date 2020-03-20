import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';
import { throttle } from 'lodash';

export { ScrollOptions, ScrollType };

type ScrollOptions = {
	callback: (eventType: ScrollType) => {};
	thresholdTop: number;
	thresholdBottom: number;
	thresholdLeft: number;
	thresholdRight: number;
};

enum ScrollType {
	TOP_ENTER = 'TOP ENTER',
	TOP_LEAVE = 'TOP LEAVE',
	BOTTOM_ENTER = 'BOTTOM ENTER',
	BOTTOM_LEAVE = 'BOTTOM LEAVE',
	LEFT_ENTER = 'LEFT ENTER',
	LEFT_LEAVE = 'LEFT LEAVE',
	RIGHT_ENTER = 'RIGHT ENTER',
	RIGHT_LEAVE = 'RIGHT LEAVE'
}

const Scroll: DirectiveOptions = {
	bind(element, binding, vnode) {
		const options: ScrollOptions = binding.value;
		if (!options) return;

		if (!options.thresholdBottom) options.thresholdBottom = 15;
		if (!options.thresholdTop) options.thresholdTop = 15;
		if (!options.thresholdLeft) options.thresholdLeft = 15;
		if (!options.thresholdRight) options.thresholdRight = 15;

		let reachedTop = true;
		let reachedBottom = false;
		let reachedLeft = true;
		let reachedRight = false;

		element.onscroll = throttle(event => {
			const {
				scrollTop,
				scrollLeft,
				scrollHeight,
				scrollWidth,
				offsetHeight,
				offsetWidth
			} = event.target;
			const maxHeight = scrollHeight - offsetHeight;
			const maxWidth = scrollWidth - offsetWidth;

			if (scrollLeft <= options.thresholdLeft) {
				if (!reachedLeft) {
					options.callback(ScrollType.LEFT_ENTER);
					reachedLeft = true;
				}
			} else if (maxWidth - scrollLeft <= options.thresholdRight) {
				if (!reachedRight) {
					options.callback(ScrollType.RIGHT_ENTER);
					reachedRight = true;
				}
			} else {
				if (reachedLeft) {
					options.callback(ScrollType.LEFT_LEAVE);
				}
				if (reachedRight) {
					options.callback(ScrollType.RIGHT_LEAVE);
				}

				reachedLeft = false;
				reachedRight = false;
			}

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
