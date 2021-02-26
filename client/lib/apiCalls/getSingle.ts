import { createError, featherCall, IResponse } from './axios';
import { generateFormDataForFiles, generateFormDataForURLs } from '@/utils/index';
import type { FileInfoType } from '@/types/index';

export default async function getSingleFeather(
	data: FileInfoType | SVGFESpecularLightingElement,
	height: number,
	width: number
): Promise<IResponse> {
	if (typeof data === 'string') {
		return getSingleFeatherFromURL(data as string, height, width);
	} else {
		return getSingleFeatherFromFile(data as FileInfoType, height, width);
	}
}

async function getSingleFeatherFromFile(
	fileInfo: FileInfoType,
	height: number,
	width: number
): Promise<IResponse> {
	const formdata = generateFormDataForFiles([fileInfo], height, width);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}

async function getSingleFeatherFromURL(
	url: string,
	height: number,
	width: number
): Promise<IResponse> {
	const formdata = generateFormDataForURLs([url], height, width);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}
