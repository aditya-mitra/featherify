import axios, { AxiosError } from 'axios';

import { FileInfoType, GeneratedType } from '@/types/index';
import { createErrorToasts } from '@/utils/index';
import getFormData from '@/utils/formData';

const BASEURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/manipulate' : 'lambda url';

const featherCall = axios.create({
	baseURL: BASEURL,
	timeout: 4 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export async function getFeathersFromFiles(fileInfos: FileInfoType[]): Promise<IResponse> {
	const formdata = getFormData(fileInfos);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}

export async function getSingleFeatherFromFile(fileInfo: FileInfoType): Promise<ISingleResponse> {
	const formdata = getFormData([fileInfo]);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feather: data }))
		.catch((error) => createError(error));
}

function createError(error: AxiosError) {
	const errorAsString = error.message || JSON.stringify(error);
	createErrorToasts([
		{
			title: error.name || 'Problem when during request',
			description: errorAsString,
			duration: 3000,
		},
	]);
	return { success: false, error: errorAsString };
}

interface IResponse {
	success: boolean;
	feathers?: Array<GeneratedType>;
	error?: string;
}

interface ISingleResponse {
	success: boolean;
	feather?: GeneratedType;
	error?: string;
}
