
export async function getValidFileAndStatuses(files: FileList) {
	const validFiles: File[] = [];
	const statuses: FileStatusType[] = [];

	for (let i = 0; i < files.length; i++) {
		const fileData = await getFileData(files[i]);

		// skip for duplicate files
		if (validFiles.find((item) => item.name === files[i].name)) continue;

		if (isFileValid(files[i]) && fileData) {
			statuses.push({
				valid: true,
				name: files[i].name,
				size: getReadableFileSize(files[i].size),
				imgSrc: fileData.src,
			});
			validFiles.push(files[i]);
		} else {
			statuses.push({ valid: false, name: files[i].name });
		}
	}

	return { validFiles, statuses };
}

function getFileData(file: File): Promise<{ src: string | undefined } | undefined> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			resolve({ src: e.target?.result as string | undefined });
		};
		reader.onerror = () => reject();
	});
}

function getReadableFileSize(size: number) {
	if (size === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(size) / Math.log(k));
	return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function isFileValid(file: File) {
	return ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon'].includes(file.type);
}

export type FileStatusType = {
	valid: boolean;
	name: string;
	imgSrc?: string | undefined;
	size?: string;
};
