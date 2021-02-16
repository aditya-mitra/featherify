import type { Dispatch, ReactNode } from 'react';

export const initialValue: IState = {
	imgSrc: '',
	dimensions: 15,
	blur: 1.5,
	scale: 1.2,
	format: 'css',
	code: 'getting the output',
};

export function lazyInit(providedValue: IState): IState {
	return { ...initialValue, ...providedValue };
}

export function reducer(state: IState, action: IAction): IState {
	const { dimensions, scale, blur, format } = action.payload as Required<IActionPayload>;

	console.log('the displathed is', action.payload);
	switch (action.type) {
		case 'CHANGE_DIMENSIONS':
			return { ...state, dimensions };
		case 'CHANGE_SCALE':
			return { ...state, scale };
		case 'CHANGE_BLUR':
			return { ...state, blur };
		case 'CHANGE_FORMAT':
			return { ...state, format };
		case 'RESET':
			return lazyInit(initialValue);
		default:
			return state;
	}
}

type ActionType = 'CHANGE_DIMENSIONS' | 'CHANGE_BLUR' | 'CHANGE_SCALE' | 'CHANGE_FORMAT' | 'RESET';

export type FormatType = 'css' | 'base64';

type IActionPayload = Omit<Partial<IState>, 'imgSrc' | 'code'>;

interface IAction {
	type: ActionType;
	payload: IActionPayload;
}

export interface IState {
	imgSrc: string;
	dimensions: number;
	blur: number;
	scale: number;
	format: FormatType;
	code: string;
}

export interface IControlProviderProps {
	providerValue: IState;
	children: ReactNode;
}

export interface IControlContext {
	controlState: IState;
	dispatchControl: Dispatch<IAction>;
}
