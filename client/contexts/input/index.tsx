import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from 'react';

import { getFormData } from '@/lib/formData';
import { getFileDatas } from '@/lib/filesHandler';
import type { FileInfoType, GeneratedType } from '@/types/index';
import { getDynaImageFromFiles } from '@/lib/apiCalls';
import { usePlays } from '../output';

const InputContext = createContext<IInputContext>({
	fileControl: {
		fileInfos: [],
		setFileInfos: () => {},
		handleAdd: () => Promise.resolve(),
		handleRemove: () => {},
		handleSubmit: () => {},
	},
	loadingControl: {
		loading: false,
		setLoading: () => {},
	},
});

export function InputProvider({ children }: IInputProviderProps) {
	// TODO: Add Debounced State here
	const [fileInfos, setFileInfos] = useState<FileInfoType[]>([]);
	const { addPlays } = usePlays();
	const [loading, setLoading] = useState(false);

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

	const handleSubmit = async () => {
		const formDataWithImagesOrUrls = getFormData(fileInfos);
		await getDynaImageFromFiles(formDataWithImagesOrUrls).then(({ dyna }) => {
			// TODO: add a toast for error when dyna is undefined and success is false
			addPlays(fileInfos, dyna as GeneratedType[]);
			setFileInfos([]);
			setLoading(false);
		});
	};

	const fileControl = { fileInfos, setFileInfos, handleAdd, handleRemove, handleSubmit };
	const loadingControl = { loading, setLoading };

	return (
		<InputContext.Provider value={{ fileControl, loadingControl }}>
			{children}
		</InputContext.Provider>
	);
}

export function useInputFiles() {
	return useContext(InputContext).fileControl;
}

export function useInputLoading() {
	return useContext(InputContext).loadingControl;
}

interface IInputContext {
	fileControl: {
		fileInfos: FileInfoType[];
		setFileInfos: Dispatch<SetStateAction<FileInfoType[]>>;
		handleAdd: (files: FileList | null) => Promise<void>;
		handleRemove: (idx: number) => void;
		handleSubmit: () => void;
	};
	loadingControl: {
		loading: boolean;
		setLoading: Dispatch<SetStateAction<boolean>>;
	};
}

interface IInputProviderProps {
	children: ReactNode;
}
