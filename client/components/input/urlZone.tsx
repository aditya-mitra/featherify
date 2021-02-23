import { KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { Box, Heading, Input, Stack } from '@chakra-ui/react';

import { useInputUrls } from '@/contexts/input';

const placeholderText = 'ex. https://source.unsplash.com/random (press enter to add more urls)';

export default function UrlZone() {
	const { urlRefs, addAnotherUrl, removeAUrl } = useInputUrls();

	useEffect(() => {
		addAnotherUrl();
	}, []);

	return (
		<Box my="10" mx="4">
			<Heading textAlign="center" my="4">
				URL Feathers
			</Heading>
			<Stack>
				{urlRefs.map((_, i) => (
					<Input
						key={i}
						placeholder={placeholderText}
						size="md"
						ref={urlRefs[i]}
						onKeyDown={(e) => handleKeyDown(e, addAnotherUrl)}
						onChange={(e) => handleChange(e, removeAUrl, i)}
					/>
				))}
			</Stack>
		</Box>
	);
}

function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, addAnotherUrl: CallableFunction) {
	if (event.key === 'Enter') {
		addAnotherUrl();
	}
}

function handleChange(
	event: ChangeEvent<HTMLInputElement>,
	removeUrl: (i: number) => void,
	i: number
) {
	if (event.target.value === '') {
		removeUrl(i);
	}
}
