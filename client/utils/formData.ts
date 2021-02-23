import type { FileInfoType } from '@/types/index';

export default function generateFormData(
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
