export type FileInfoType = {
	valid: boolean;
	name: string;
	imgSrc?: string | undefined;
	size?: string;
	data?: File;
};

// TODO: Rename this variable
export type GeneratedType = {
	name: string;
	styles: object;
};
