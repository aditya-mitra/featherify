import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { useControl } from '@/contexts/play';
import { defaultSettings } from '@/utils/index';

export function InputImage({ src }: { src: string }) {
	return (
		<Box h="450px">
			<img
				src={src}
				alt={src}
				style={{
					display: 'block',
					height: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
					width: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
				}}
			/>
		</Box>
	);
}

export function OutputImage() {
	const {
		controlState: { code, blur, scale,uuid },
	} = useControl();

	const styles = useMemo(
		() => ({
			...code,
			filter: `blur(${blur}px)`,
			transform: `scale(${scale})`,
			height: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			width: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			backgroundRepeat: 'no-repeat', // otherwise we will see rows
		}),
		[code, blur, scale]
	);

	console.log(uuid)

	return (
		<Box h="450px" my="7">
			<div style={styles} />
		</Box>
	);
}
