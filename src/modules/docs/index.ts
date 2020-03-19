import { defineModule } from '@/modules/define';
import Docs from './routes/docs/';

export default defineModule({
	id: 'docs',
	register: ({ i18n }) => ({
		name: i18n.tc('docs', 2),
		routes: [
			{
				path: '/',
				component: Docs
			}
		],
		icon: 'help'
	})
});
