import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';

import { getFileDatas } from '@/lib/filesHandler';
import type { FileInfoType } from '@/types/index';

const InputContext = createContext<IInputContext>({
	fileControl: {
		fileInfos: [],
		setFileInfos: () => {},
		handleAdd: () => Promise.resolve(),
		handleRemove: () => {},
	},
});

export function InputProvider({ children }: IInputProviderProps) {
	// TODO: Add Debounced State here
	const [fileInfos, setFileInfos] = useState<FileInfoType[]>([]);

	const handleAdd = useCallback(async (files: FileList | null) => {
		if (!files || files.length === 0) return;
		const { fileInfos } = await getFileDatas(files);
		setFileInfos((prev) => prev.concat(fileInfos));
	}, []);

	const handleRemove = useCallback(
		(idx: number) => {
			const tempArray = [...fileInfos];
			tempArray.splice(idx, 1);
			setFileInfos(tempArray);
		},
		[fileInfos]
	);

	const fileControl = { fileInfos, setFileInfos, handleAdd, handleRemove };

	return <InputContext.Provider value={{ fileControl }}>{children}</InputContext.Provider>;
}

export function useInputFiles() {
	return useContext(InputContext).fileControl;
}

interface IInputContext {
	fileControl: {
		fileInfos: FileInfoType[];
		setFileInfos: Dispatch<SetStateAction<FileInfoType[]>>;
		handleAdd: (files: FileList | null) => Promise<void>;
		handleRemove: (idx: number) => void;
	};
}

interface IInputProviderProps {
	children: ReactNode;
}
