import {
	createContext,
	createRef,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

import { getFileDatas } from '@/lib/filesHandler';
import type { FileInfoType, GeneratedType } from '@/types/index';
import { getFeathersFromFiles } from '@/lib/apiCalls';
import { usePlays } from '@/contexts/playground';
import useDebouncedState from '@/hooks/useDebouncedState';

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
	urlControl: {
		urlRefs: [],
		addAnotherUrl: () => {},
		removeAUrl: () => {},
	},
});

export function InputProvider({ children }: IInputProviderProps) {
	const { addPlays } = usePlays();

	const [fileInfos, setFileInfos] = useState<FileInfoType[]>([]);

	const [urlArrayLength, setUrlArrayLength] = useState(1);
	const [urlRefs, setUrlRefs] = useDebouncedState<RefObject<HTMLInputElement>[]>([], 25);

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

	const handleSubmit = useCallback(async () => {
		await getFeathersFromFiles(fileInfos).then(({ feathers, success }) => {
			if (success) {
				addPlays(fileInfos, feathers as GeneratedType[]);
				setFileInfos([]);
			}
			setLoading(false);
		});
	}, [addPlays, setFileInfos, setLoading, getFeathersFromFiles]);

	const addAnotherUrl = useCallback(() => {
		setUrlArrayLength((p) => p + 1);
		setUrlRefs((prev) =>
			Array(urlArrayLength)
				.fill(null)
				.map((_, i) => prev[i] || createRef())
		);
	}, [urlArrayLength, setUrlRefs, setUrlArrayLength]);

	const removeAUrl = useCallback(
		(i: number) => {
			if (urlArrayLength === 1) return;
			setUrlArrayLength((p) => p - 1);
			const newArr = [...urlRefs];
			newArr.splice(i, 1);
			setUrlRefs(newArr);
		},
		[urlArrayLength, setUrlArrayLength, urlRefs, setUrlRefs]
	);

	const fileControl = useMemo(
		() => ({ fileInfos, setFileInfos, handleAdd, handleRemove, handleSubmit }),
		[fileInfos, setFileInfos, handleAdd, handleRemove, handleSubmit]
	);
	const loadingControl = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);
	const urlControl = useMemo(() => ({ urlRefs, addAnotherUrl, removeAUrl }), [
		urlRefs,
		addAnotherUrl,
		removeAUrl,
	]);

	return (
		<InputContext.Provider value={{ fileControl, loadingControl, urlControl }}>
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

export function useInputUrls() {
	return useContext(InputContext).urlControl;
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
	urlControl: {
		urlRefs: RefObject<HTMLInputElement>[];
		addAnotherUrl: () => void;
		removeAUrl: (i: number) => void;
	};
}

interface IInputProviderProps {
	children: ReactNode;
}
