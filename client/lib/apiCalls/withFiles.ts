import { createError, featherCall, IResponse } from './axios';
import { generateFormDataForFiles } from '@/utils/index';
import type { FileInfoType } from '@/types/index';

export async function getFeathersFromFiles(fileInfos: FileInfoType[]): Promise<IResponse> {
	console.log('the file infos are', fileInfos);
	const formdata = generateFormDataForFiles(fileInfos);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}

export async function getSingleFeatherFromFile(
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
