import DropZone from './dropZone';
import { InputProvider } from '@/contexts/input';

export default function InputChamber() {

	return (
		<InputProvider>
			<DropZone />
		</InputProvider>
	);
}
