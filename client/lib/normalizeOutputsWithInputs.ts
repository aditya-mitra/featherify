import { ErrorDisplayType, FileInfoType, GeneratedType, PlayType } from '@/types/index';
import { playSettings } from '@/utils/defaultSettings';

export default function normalize(
	inputs: FileInfoType[],
	outputs: GeneratedType[]
): INormalizeReturn {
	// for each valid input we are expecting an output

	const normalizedPlays: PlayType[] = [];
	const errors: ErrorDisplayType[] = [];

	let o: number = 0;

	for (const i in inputs) {
		const input = inputs[i];
		const output = outputs[o];

		if (input.valid && output.styles) {
			normalizedPlays.push({
				...playSettings,
				imgSrc: input.imgSrc as string,
				file: input.data as File,
				code: output.styles,
				name: output.name,
				uuid: output.uuid,
			});
			o++;
		} else if (output.error || !output.styles) {
			errors.push({
				title: input.name,
				description: output.error
					? JSON.stringify(output.error)
					: `Could not get the Feather for ${input.name}`,
			});
			o++;
		}
	}

	return { normalizedPlays, errors };
}

interface INormalizeReturn {
	normalizedPlays: PlayType[];
	errors: ErrorDisplayType[];
}
