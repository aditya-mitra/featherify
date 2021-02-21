import type { FileInfoType } from '@/types/index';

export function getFormData(files: FileInfoType[]): FormData {
	const fileFormData = new FormData();
	for (const file of files) {
		if (file.valid) {
			fileFormData.append('images', file.data as File);
		}
	}
	return fileFormData;
}
