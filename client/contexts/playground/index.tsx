import { createContext, ReactNode, useState, useContext } from 'react';

import { FileInfoType, GeneratedType, PlayType } from '@/types/index';
import normalize from '@/lib/normalizeOutputsWithInputs';
import { createErrorToasts, removeAPlayItem } from '@/utils/index';

const PlayGroundChamberContext = createContext<IPlayGroundChamberContext>({
	plays: [],
	addPlays: () => {},
	removePlay: () => {},
});

export function PlayGroundChamberProvider({ children }: IPlayGroundChamberProviderProps) {
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
		<PlayGroundChamberContext.Provider value={{ plays, addPlays, removePlay }}>
			{children}
		</PlayGroundChamberContext.Provider>
	);
}

export function usePlays() {
	return useContext(PlayGroundChamberContext);
}

type addPlaysType = (ins: FileInfoType[], outs: GeneratedType[]) => void;

interface IPlayGroundChamberProviderProps {
	children: ReactNode;
}

interface IPlayGroundChamberContext {
	plays: PlayType[];
	addPlays: addPlaysType;
	removePlay: (uuid: string) => void;
}
