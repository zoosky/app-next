import Vue from 'vue';

import Focus from './focus/focus';
import Tooltip from './tooltip/tooltip';
import Scroll from './scroll/scroll';

Vue.directive('focus', Focus);
Vue.directive('tooltip', Tooltip);
Vue.directive('scroll', Scroll);
