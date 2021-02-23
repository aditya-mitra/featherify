import axios from 'axios';

import { GeneratedType } from '@/types/index';
import { createErrorToasts } from '@/utils/index';

const BASEURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/manipulate' : 'lambda url';

const featherCall = axios.create({
	baseURL: BASEURL,
	timeout: 10 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export async function getFeathersFromFiles(formdata: FormData): Promise<IResponse> {
	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feather: data }))
		.catch((error) => {
			const errorAsString = error.message || JSON.stringify(error);
			createErrorToasts([
				{
					title: 'Problem when during request',
					description: errorAsString,
					duration: 3000,
				},
			]);
			return { success: false, error: errorAsString };
		});
}

interface IResponse {
	success: boolean;
	feather?: Array<GeneratedType>;
	error?: string;
}
