import {
	useEffect,
	useCallback,
	useRef,
	createRef,
	KeyboardEvent,
	MouseEvent,
	ChangeEvent,
} from 'react';
import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';

import { useInputLoading, useInputUrls } from '@/contexts/input';
import { createArrayWithRefsHavingValue } from '@/utils/index';

const placeholderText = 'ex. https://source.unsplash.com/random (press enter to add more urls)';

export default function UrlZone() {
	const { urlsCount, setUrlsCount, submitURLs } = useInputUrls();
	const { loading, setLoading } = useInputLoading();

	const urlRefs = useRef<HTMLInputElement[]>([]);

	const addAnotherUrl = useCallback(() => {
		setUrlsCount((p) => p + 1);
	}, [setUrlsCount]);

	const removeAUrl = useCallback(() => {
		// setUrlsCount((prev) => prev.slice(0, prev.length - 1));
		console.log('TODO: delete method');
	}, []);

	const handleSubmit = useCallback(() => {
		setLoading(true);
		const newUrlStrs = createArrayWithRefsHavingValue(urlRefs.current);
		submitURLs(newUrlStrs);

		urlRefs.current[0].value = '';
		urlRefs.current.splice(1);
	}, [urlRefs, setUrlsCount]);

	if (urlRefs.current.length !== urlsCount) {
		urlRefs.current = Array(urlsCount)
			.fill(null)
			.map((_, i) => urlRefs.current[i] || createRef());
	}

	useEffect(() => {
		urlRefs.current[urlsCount - 1].focus();
	}, [urlsCount]);

	return (
		<Box my="10" mx="4">
			<Heading textAlign="center" my="4">
				URL Feathers
			</Heading>
			<Flex alignItems="center" flexDirection="column">
				<Stack w="full">
					{urlRefs.current &&
						urlRefs.current.map((_, i) => (
							<Input
								key={i}
								placeholder={placeholderText}
								size="md"
								ref={(r) => r && (urlRefs.current[i] = r)}
								onKeyDown={(e) => handleKeyDown(e, addAnotherUrl)}
								onChange={(e) => handleOnChange(e, removeAUrl)}
							/>
						))}
				</Stack>
				<SubmitButton handleOnClick={handleSubmit} loading={loading} />
			</Flex>
		</Box>
	);
}

function SubmitButton({ handleOnClick, loading }: ISubmitButton) {
	return (
		<Button
			d="block"
			colorScheme="twitter"
			mt="2.5"
			width="35%"
			alignContent="center"
			justifyContent="center"
			isLoading={loading}
			onClick={handleOnClick}>
			Submit URLs
		</Button>
	);
}

function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, addAnotherUrl: CallableFunction) {
	if (event.key === 'Enter') {
		addAnotherUrl();
	}
}

function handleOnChange(event: ChangeEvent<HTMLInputElement>, removeUrl: CallableFunction) {
	if (event.target.value === '') {
		removeUrl();
	}
}

interface ISubmitButton {
	handleOnClick: (event: MouseEvent) => void;
	loading: boolean;
}
