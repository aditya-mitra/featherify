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

// TODO: just target these 2 formats for now until FULL completion
export type FormatType = 'css' | 'base64';

export type PlayType = {
	name: string;
	file: File;
	imgSrc: string;
	width: number;
	height: number;
	blur: number;
	scale: number;
	format: FormatType;
	code: string;
};
