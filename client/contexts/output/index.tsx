import { createContext, ReactNode, useState, useContext } from 'react';

import { FileInfoType, GeneratedType, PlayType } from '@/types/index';
import normalize from '@/lib/normalizeOutputsWithInputs';
import createErrorToasts from '@/utils/errorToasts';
import removeAPlayItem from '@/utils/removeAPlayItem';

export const OutputChamberContext = createContext<IOutputChamberContext>({
	plays: [],
	addPlays: () => {},
	removePlay: () => {},
});

export function OutputChamberProvider({ children }: IOutputChamberProviderProps) {
	const [plays, setPlays] = useState<PlayType[]>([]);

	const addPlays: addPlaysType = (ins, outs) => {
		const { normalizedPlays, errors } = normalize(ins, outs);
		createErrorToasts(errors);
		setPlays((prev) => prev.concat(normalizedPlays));
	};

	const removePlay = (uuid: string) => {
		const newPlays = removeAPlayItem(plays, uuid);
		setPlays(newPlays);
	};

	return (
		<OutputChamberContext.Provider value={{ plays, addPlays, removePlay }}>
			{children}
		</OutputChamberContext.Provider>
	);
}

export function usePlays() {
	return useContext(OutputChamberContext);
}

type addPlaysType = (ins: FileInfoType[], outs: GeneratedType[]) => void;

interface IOutputChamberProviderProps {
	children: ReactNode;
}

interface IOutputChamberContext {
	plays: PlayType[];
	addPlays: addPlaysType;
	removePlay: (uuid: string) => void;
}
