import { createContext, ReactNode, useState, useContext } from 'react';

import { FileInfoType, GeneratedType, PlayType } from '@/types/index';
import normalize from '@/lib/normalizeOutputsWithInputs';

export const OutputChamberContext = createContext<IOutputChamberContext>({
	plays: [],
	addPlays: () => {},
});

export function OutputChamberProvider({ children }: IOutputChamberProviderProps) {
	const [plays, setPlays] = useState<PlayType[]>([]);

	const addPlays: addPlaysType = (ins, outs) => {
		setPlays((prev) => prev.concat(normalize(ins, outs)));
	};

	return (
		<OutputChamberContext.Provider value={{ plays, addPlays }}>
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
}
