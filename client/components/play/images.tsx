import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { useControl } from '@/contexts/play';

export function InputImage({ src }: { src: string }) {
	return (
		<Box h="450px">
			<img src={src} alt="random image" style={{ maxHeight: '100%', maxWidth: '100%' }} />
		</Box>
	);
}

export function OutputImage() {
	// TODO: needs refactoring for base64 and css codes
	const {
		controlState: { code, blur, scale },
	} = useControl();

	const styles = useMemo(
		() => ({
			...code,
			filter: `blur(${blur}px)`,
			transform: `scale(${scale})`,
			height: '300px',
			width: '300px',
			backgroundRepeat: 'no-repeat', // otherwise we will see rows
		}),
		[code, blur, scale]
	);

	console.log('the styles are ', styles);

	return (
		<Box h="450px">
			<div style={styles} />
		</Box>
	);
}
