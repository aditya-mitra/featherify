import { useReducer, createContext, useContext, Dispatch, ReactNode } from 'react';

import { reducer, IAction } from './reducer';
import { PlayType } from '@/types/index';

const ControlContext = createContext<IControlContext>({
	controlState: {} as any,
	dispatchControl: () => {},
});

export function PlayControlProvider({ providerValue, children }: IControlProviderProps) {
	const [controlState, dispatchControl] = useReducer(reducer, providerValue);

	return (
		<ControlContext.Provider value={{ controlState, dispatchControl }}>
			{children}
		</ControlContext.Provider>
	);
}

export function useControl() {
	return useContext(ControlContext);
}

export function usePlayControlValue() {
	return useContext(ControlContext).controlState;
}

export type IPlayControlProps = Omit<IControlProviderProps, 'children'> & {
	uniqueId: number | string;
};

export interface IControlProviderProps {
	providerValue: PlayType;
	children: ReactNode;
}

export interface IControlContext {
	controlState: PlayType;
	dispatchControl: Dispatch<IAction>;
}
