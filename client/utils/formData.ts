import type { FileInfoType } from '@/types/index';

export function generateFormDataForFiles(
	files: FileInfoType[],
	height?: number,
	width?: number
): FormData {
	const fileFormData = new FormData();
	for (const file of files) {
		if (file.valid) {
			fileFormData.append('images', file.data as File);
			if (height && width) {
				fileFormData.append('height', height.toString());
				fileFormData.append('width', width.toString());
			}
		}
	}
	return fileFormData;
}

export function generateFormDataForURLs(urls: string[], height?: number, width?: number): FormData {
	const urlFormData = new FormData();
	for (const url of urls) {
		urlFormData.append('urls', url);
		if (height && width) {
			urlFormData.append('height', height.toString());
			urlFormData.append('width', width.toString());
		}
	}
	return urlFormData;
}
