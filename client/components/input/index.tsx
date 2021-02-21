import DropZone from './dropZone';
import { InputProvider } from '@/contexts/input';

export default function InputChamber() {
	// const [fileInfos, setFileInfos] = useState<FileInfoType[]>([]);

	return (
		<InputProvider>
			<DropZone />
		</InputProvider>
	);
}
