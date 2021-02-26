import axios, { AxiosError } from 'axios';

import { createErrorToasts } from '@/utils/index';
import type { GeneratedType } from '@/types/index';

const BASEURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/manipulate' : 'lambda url';

export const featherCall = axios.create({
	baseURL: BASEURL,
	timeout: 4 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export function createError(error: AxiosError) {
	const errorAsString = error.response?.data?.detail || error.message || JSON.stringify(error);
	createErrorToasts([
		{
			title: error.name || 'Problem when during request',
			description: errorAsString,
			duration: 3000,
		},
	]);
	return { success: false, error: errorAsString };
}
export interface IResponse {
	success: boolean;
	feathers?: Array<GeneratedType>;
	error?: string;
}