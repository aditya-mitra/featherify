import type { PlayType } from '@/types/index';
import { playSettings } from '@/utils/defaultSettings';

const initialValue: Required<IActionPayload> = playSettings;

export function reducer(state: PlayType, action: IAction): PlayType {
	const { height, width, scale, blur, format } = action.payload as Required<IActionPayload>;

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
	| 'RESET';

// restricting payload to not change certain keys
type IActionPayload = Omit<Partial<PlayType>, 'imgSrc' | 'code' | 'name' | 'file'>;

export interface IAction {
	type: ActionType;
	payload: IActionPayload;
}
