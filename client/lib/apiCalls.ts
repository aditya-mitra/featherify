import axios from 'axios';

import { GeneratedType } from '@/types/index';
import createErrorToasts from '@/utils/errorToasts';

const BASEURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/manipulate' : 'amplify url';

const dyna = axios.create({
	baseURL: BASEURL,
	timeout: 10 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export async function getDynaImageFromFiles(formdata: FormData): Promise<IResponse> {
	return dyna({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, dyna: data }))
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
	dyna?: Array<GeneratedType>;
	error?: string;
}
