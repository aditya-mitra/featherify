import { createError, featherCall, IResponse } from './axios';
import { generateFormDataForFiles, generateFormDataForURLs } from '@/utils/index';
import { generateValidFileInfo } from '@/lib/filesHandler';
import type { FileInfoType } from '@/types/index';

export default async function getSingleFeather(
	data: File | string,
	height: number,
	width: number
): Promise<IResponse> {
	if (typeof data === 'string') {
		return getSingleFeatherFromURL(data as string, height, width);
	} else {
		const fileInfo = generateValidFileInfo('single file', data);
		return getSingleFeatherFromFile(fileInfo, height, width);
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
