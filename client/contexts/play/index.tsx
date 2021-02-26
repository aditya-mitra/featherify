import { useReducer, createContext, useContext, Dispatch, ReactNode, useCallback } from 'react';

import { reducer, IAction, IActionPayload } from './reducer';
import type { PlayType, ServerActionType } from '@/types/index';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';
import { getSingleFeather } from '@/lib/apiCalls';

const ControlContext = createContext<IControlContext>({
	controlState: {} as any,
	dispatchControl: () => {},
	changeControlWithServer: () => {},
});

export function PlayControlProvider({ providerValue, children }: IControlProviderProps) {
	const [controlState, dispatchControl] = useReducer(reducer, providerValue);

	// TODO: the controlState contains the previous value and not the updated one
	const changeControlOnServerResponse = useDebouncedCallback(
		() => {
			getSingleFeather(
				controlState.file ?? controlState.imgSrc,
				controlState.height,
				controlState.width,
				controlState.config
			).then(({ feathers, success }) => {
				if (success && feathers) {
					dispatchControl({
						type: 'NEW_CODE',
						payload: { code: feathers[0].styles ?? feathers[0].base64 },
					});
				}
			});
		},
		[dispatchControl, controlState],
		250
	);

	const changeControlWithServer: IChangeControlWithServer = useCallback(
		(control) => {
			dispatchControl(control);
			changeControlOnServerResponse();
		},
		[dispatchControl, changeControlOnServerResponse]
	);

	return (
		<ControlContext.Provider value={{ controlState, dispatchControl, changeControlWithServer }}>
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
	uniqueId: string;
};

export interface IControlProviderProps {
	providerValue: PlayType;
	children: ReactNode;
}

export interface IControlContext {
	controlState: PlayType;
	dispatchControl: Dispatch<IAction>;
	changeControlWithServer: IChangeControlWithServer;
}

interface IChangeControlWithServer {
	(Control: IServerActionPayload): void;
}

interface IServerActionPayload {
	type: ServerActionType;
	payload: IActionPayload;
}
