export type FileInfoType = {
	valid: boolean;
	name: string;
	imgSrc?: string | undefined;
	size?: string;
	data?: File;
};

export type GeneratedType = {
	name?: string;
	uuid?: string;
	styles?: object;
	error?: object;
	base64?: string;
};

export type ConfigType = 'css' | 'base64';

export type PlayType = {
	name: string;
	uuid: string;
	file?: File;
	imgSrc: string;
	width: number;
	height: number;
	blur: number;
	scale: number;
	config: ConfigType;
	code: object | string;
};

export type ErrorDisplayType = {
	title: string;
	description: string;
	duration?: number;
};

export type ActionType =
	| 'CHANGE_HEIGHT'
	| 'CHANGE_WIDTH'
	| 'CHANGE_BLUR'
	| 'CHANGE_SCALE'
	| 'CHANGE_CONFIG'
	| 'NEW_CODE'
	| 'RESET';

export type ServerActionType = 'CHANGE_CONFIG' | 'CHANGE_HEIGHT' | 'CHANGE_WIDTH';

export type SuccessFeatherType = {
	uuid: string;
	name: string;
	styles?: object;
	base64?: string;
};
