import { Box } from '@chakra-ui/react';

export function InputImage({ src }: { src: string }) {
	return (
		<Box h="450px">
			<img src={src} alt="random image" style={{ maxHeight: '100%', maxWidth: '100%' }} />
		</Box>
	);
}

export function OutputImage() {
	// TODO: needs refactoring for base64 and css codes
	return (
		<Box h="450px">
			<img src="https://source.unsplash.com/random" alt="output image" />
		</Box>
	);
}
