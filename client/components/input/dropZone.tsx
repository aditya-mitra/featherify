import { useCallback, useState, DragEvent } from 'react';
import { Avatar, Badge, Box, BoxProps, Button, Flex, Stack, Text } from '@chakra-ui/react';

import { getValidFileAndStatuses, FileStatusType } from './filesHandler';

export default function DropZone() {
	const [receivedFiles, setReceivedFiles] = useState<File[]>([]); // has to be highly elevated state with context for input and output
	const [fileStatuses, setFileStatuses] = useState<FileStatusType[]>([]);

	const handleOnDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		const { validFiles, statuses } = await getValidFileAndStatuses(e.dataTransfer.files);
		setReceivedFiles((prev) => prev.concat(validFiles));
		setFileStatuses((prev) => prev.concat(statuses));
	}, []);

	console.log('rec', receivedFiles);

	return (
		<Box my="8">
			<DropZoneCatcher onDrop={handleOnDrop}>
				{fileStatuses.length > 0 ? (
					fileStatuses.map((fileStatus) => (
						<DropZoneStatus
							name={fileStatus.name}
							size={fileStatus.size ?? ''}
							src={fileStatus.imgSrc ?? ''}
							valid={fileStatus.valid}
						/>
					))
				) : (
					<DropZoneInitialText />
				)}
			</DropZoneCatcher>
		</Box>
	);
}

function DropZoneCatcher(props: BoxProps) {
	return (
		<Box
			m="3"
			h="md"
			d="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			borderWidth="medium"
			borderStyle="dashed"
			borderRadius="lg"
			onDragOver={(e) => e.preventDefault()}
			onDragEnter={(e) => e.preventDefault()}
			onDragLeave={(e) => e.preventDefault()}
			{...props}>
			{props.children}
		</Box>
	);
}

function DropZoneInitialText() {
	return (
		<>
			<Text fontSize="4xl" fontWeight="bold" color="facebook">
				Drag and Drop Files Here
			</Text>
			<Button d="block" colorScheme="telegram" mt="2.5">
				Or Select the Files
			</Button>
		</>
	);
}

function DropZoneStatus({ size, name, src }: IDropZoneStatus) {
	return (
		<Stack
			direction={{ base: 'column', md: 'row' }}
			spacing="6"
			mx="auto"
			shadow="md"
			rounded="lg"
			border="1px"
			px="2">
			<Flex direction={{ base: 'column', md: 'row' }} w="3xl" alignItems="center">
				<Box mx="2">
					<Avatar size="lg" src={src} />
				</Box>
				<Box mx="2">
					<Text fontWeight="semibold">{name}</Text>
				</Box>
				<Box mx="2">
					<Badge>{size}</Badge>
				</Box>
			</Flex>
		</Stack>
	);
}

interface IDropZoneStatus {
	size: string;
	name: string;
	src: string;
	valid: boolean;
}
