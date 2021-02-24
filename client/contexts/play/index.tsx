import { useReducer, createContext, useContext, Dispatch, ReactNode } from 'react';

import { reducer, IAction } from './reducer';
import { PlayType } from '@/types/index';
import useDebouncedEffect from '@/hooks/useDebounceEffect';
import { generateValidFileInfo } from '@/lib/filesHandler';
import { getSingleFeatherFromFile } from '@/lib/apiCalls';

const ControlContext = createContext<IControlContext>({
	controlState: {} as any,
	dispatchControl: () => {},
});

export function PlayControlProvider({ providerValue, children }: IControlProviderProps) {
	const [controlState, dispatchControl] = useReducer(reducer, providerValue);

	useDebouncedEffect(
		() => {
			const fileInfo = generateValidFileInfo(controlState.name, controlState.file);

			getSingleFeatherFromFile(fileInfo, controlState.height, controlState.width).then(
				({ success, feathers }) => {
					if (success && Array.isArray(feathers)) {
						dispatchControl({
							type: 'NEW_IMAGE_STYLES',
							payload: { uuid: feathers[0].uuid, code: feathers[0].styles },
						});
					}
				}
			);
		},
		[controlState.height, controlState.width],
		2 * 1000
	);

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
	uniqueId: string;
};

export interface IControlProviderProps {
	providerValue: PlayType;
	children: ReactNode;
}

export interface IControlContext {
	controlState: PlayType;
	dispatchControl: Dispatch<IAction>;
}
