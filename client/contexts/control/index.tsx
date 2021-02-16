import { useReducer, createContext, useContext } from 'react';

import { lazyInit, initialValue, reducer, IControlProviderProps, IControlContext } from './reducer';

// using context for the same state throughout the 4 components
const ControlContext = createContext<IControlContext>({
	controlState: initialValue,
	dispatchControl: () => {},
});

export function ControlProvider({ providerValue, children }: IControlProviderProps) {
	const [controlState, dispatchControl] = useReducer(reducer, initialValue, () =>
		lazyInit(providerValue)
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

export type IOutputPlayProps = Omit<IControlProviderProps, 'children'> & {
	uniqueId: number | string;
};

export type { FormatType } from './reducer';
