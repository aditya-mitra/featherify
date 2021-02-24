export type FileInfoType = {
	valid: boolean;
	name: string;
	imgSrc?: string | undefined;
	size?: string;
	data?: File;
};

export type GeneratedType = {
	name: string;
	uuid: string;
	styles?: object;
	error?: object;
};

// TODO: just target these 2 formats for now until FULL completion
export type FormatType = 'css' | 'base64';

export type PlayType = {
	name: string;
	uuid: string;
	file?: File;
	imgSrc: string;
	width: number;
	height: number;
	blur: number;
	scale: number;
	format: FormatType;
	code: object;
};

export type ErrorDisplayType = {
	title: string;
	description: string;
	duration?: number;
};
