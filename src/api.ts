import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useRequestsStore } from '@/stores/requests';
import { LogoutReason, logout, checkAuth } from '@/auth';

const api = axios.create({
	baseURL: getRootPath(),
});

interface RequestConfig extends AxiosRequestConfig {
	id: string;
}

interface Response extends AxiosResponse {
	config: RequestConfig;
}

export interface RequestError extends AxiosError {
	response: Response;
}

export const onRequest = (config: AxiosRequestConfig) => {
	const requestsStore = useRequestsStore();
	const id = requestsStore.startRequest();

	const requestConfig: RequestConfig = {
		id: id,
		...config,
	};

	return requestConfig;
};

export const onResponse = (response: AxiosResponse | Response) => {
	const requestsStore = useRequestsStore();
	const id = (response.config as RequestConfig).id;
	requestsStore.endRequest(id);
	return response;
};

export const onError = async (error: RequestError) => {
	const requestsStore = useRequestsStore();
	const id = (error.response.config as RequestConfig).id;
	requestsStore.endRequest(id);

	// If a request fails with the unauthorized error, it either means that your user doesn't have
	// access, or that your session doesn't exist / has expired.
	// In case of the second, we should force the app to logout completely and redirect to the login
	// view.
	/* istanbul ignore next */
	const status = error.response?.status;
	/* istanbul ignore next */
	const code = error.response?.data?.error?.code;

	if (status === 401 && code === 3) {
		const loggedIn = await checkAuth();

		if (loggedIn === false) {
			logout({ reason: LogoutReason.ERROR_SESSION_EXPIRED });
		}
	}

	return Promise.reject(error);
};

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onError);

export function getRootPath(): string {
	const path = window.location.pathname;
	const parts = path.split('/');
	const adminIndex = parts.indexOf('admin');
	const rootPath = parts.slice(0, adminIndex).join('/') + '/';
	return rootPath;
}

export default api;
