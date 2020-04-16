export type Role = {
	id: number;
	name: string;
	description: string;
	collection_listing: null;
	module_listing: null;
	enforce_2fa: null | boolean;
	external_id: null | string;
	ip_whitelist: string[];
};

export type Avatar = {
	data: {
		thumbnails: Thumbnail[];
	};
};

type Thumbnail = {
	url: string;
	key: string;
};

// There's more data returned in thumbnails and the avatar data, but we
// only care about the thumbnails in this context

export type User = {
	id: number;
	status: string;
	first_name: string;
	last_name: string;
	email: string;
	token: string;
	last_access_on: string;
	last_page: string;
	external_id: string;
	'2fa_secret': string;
	theme: 'auto' | 'dark' | 'light';
	role: Role;
	password_reset_token: string | null;
	timezone: string;
	locale: string;
	locale_options: null;
	avatar: null | Avatar;
	company: string | null;
	title: string | null;
	email_notifications: boolean;
};
