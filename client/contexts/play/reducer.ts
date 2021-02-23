import type { PlayType } from '@/types/index';
import { defaultSettings } from '@/utils/index';

const initialValue: Required<IActionPayload> = defaultSettings.playSettings;

export function reducer(state: PlayType, action: IAction): PlayType {
	const {
		height,
		width,
		scale,
		blur,
		format,
		code,
		uuid,
	} = action.payload as Required<IActionPayload>;

	console.log('the displathed is', action.payload);
	switch (action.type) {
		case 'CHANGE_HEIGHT':
			return { ...state, height };
		case 'CHANGE_WIDTH':
			return { ...state, width };
		case 'CHANGE_SCALE':
			return { ...state, scale };
		case 'CHANGE_BLUR':
			return { ...state, blur };
		case 'CHANGE_FORMAT':
			return { ...state, format };
		case 'NEW_IMAGE_STYLES':
			return { ...state, code, uuid };
		case 'RESET':
			return { ...state, ...initialValue };
		default:
			return state;
	}
}

type ActionType =
	| 'CHANGE_HEIGHT'
	| 'CHANGE_WIDTH'
	| 'CHANGE_BLUR'
	| 'CHANGE_SCALE'
	| 'CHANGE_FORMAT'
	| 'NEW_IMAGE_STYLES'
	| 'RESET';

// restricting payload to not change certain keys
type IActionPayload = Omit<Partial<PlayType>, 'imgSrc' | 'name' | 'file'>;

export interface IAction {
	type: ActionType;
	payload: IActionPayload;
}
