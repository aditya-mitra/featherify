import { FileInfoType, GeneratedType, PlayType } from '@/types/index';
import { playSettings } from '@/utils/defaultSettings';

export default function normalize(inputs: FileInfoType[], outputs: GeneratedType[]): PlayType[] {
	// for each valid input we are expecting an output

	const normalizedPlays: PlayType[] = [];

	let o = 0;

	for (const i in inputs) {
		const input = inputs[i];
		const output = outputs[o];

		if (input.valid) {
			normalizedPlays.push({
				...playSettings,
				imgSrc: input.imgSrc as string,
				file: input.data as File,
				code: JSON.stringify(output.styles),
				name: input.name,
			});
			o++;
		}
	}

	return normalizedPlays;
}
