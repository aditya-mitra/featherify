import { createError, featherCall, IResponse } from './axios';
import { generateFormDataForURLs } from '@/utils/index';

export async function getFeathersFromURLs(urls: string[]): Promise<IResponse> {
	const formdata = generateFormDataForURLs(urls);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => {
			console.log(data, 'from api');
			return data;
		})
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}