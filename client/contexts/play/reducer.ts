import type { PlayType, ActionType } from '@/types/index';
import { defaultSettings } from '@/utils/index';

const initialValue: Required<IActionPayload> = defaultSettings.playSettings;

export function reducer(state: PlayType, action: IAction): PlayType {
	const {
		height,
		width,
		scale,
		blur,
		config,
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
		case 'CHANGE_CONFIG':
			return { ...state, config };
		case 'NEW_IMAGE_STYLES':
			return { ...state, code, uuid };
		case 'RESET':
			return { ...state, ...initialValue };
		default:
			return state;
	}
}

// restricting payload to not change certain keys
type IActionPayload = Omit<Partial<PlayType>, 'imgSrc' | 'name' | 'file'>;

export interface IAction {
	type: ActionType;
	payload: IActionPayload;
}
