import { useCallback, useState, useRef } from 'react';
import {
	Box,
	BoxProps,
	Button,
	Flex,
	Stack,
	SimpleGrid,
	Text,
	Icon,
	Image,
	useColorModeValue,
} from '@chakra-ui/react';
import { VscCheck, VscClose } from 'react-icons/vsc';
import { MdError } from 'react-icons/md';

import { getFileDatas, FileInfoTypes } from './filesHandler';

export default function DropZone() {
	const [fileInfos, setFileInfos] = useState<FileInfoTypes[]>([]);

	const handleAdd = useCallback(async (files: FileList | null) => {
		if (!files || files.length === 0) return;
		const { fileInfos } = await getFileDatas(files);
		setFileInfos((prev) => prev.concat(fileInfos));
	}, []);

	const handleRemove = useCallback(
		(idx: number) => {
			const tempArray = [...fileInfos];
			tempArray.splice(idx, 1);
			setFileInfos(tempArray);
		},
		[fileInfos]
	);

	console.log('rec', fileInfos);

	return (
		<Box my="8">
			<DropZoneCatcher
				onDrop={(e) => {
					e.preventDefault();
					handleAdd(e.dataTransfer.files);
				}}>
				{fileInfos.length > 0 ? (
					<DropZoneTable statuses={fileInfos} handleRemove={handleRemove} />
				) : (
					<DropZoneInitialText handleAdd={handleAdd} />
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

function DropZoneInitialText({ handleAdd }: IDropZoneInitialText) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<Text fontSize="4xl" fontWeight="bold" color="facebook">
				Drag and Drop Files Here
			</Text>
			<Button
				d="block"
				colorScheme="telegram"
				mt="2.5"
				onClick={() => inputRef.current?.click()}>
				Or Click to Upload Files
				<input
					type="file"
					multiple
					ref={inputRef}
					style={{ display: 'none' }}
					onChange={(e) => handleAdd(e.target.files)}
				/>
			</Button>
		</>
	);
}

function DropZoneTable({ statuses, handleRemove }: IDropZoneTableProps) {
	return (
		<Flex mx="6.5" w="full" p={50} alignItems="center" justifyContent="center">
			<Stack
				direction={{ base: 'column' }}
				w="full"
				bg={{ sm: useColorModeValue('white', 'gray.800') }}
				shadow="lg">
				<Flex
					direction={{ base: 'row', sm: 'column' }}
					textAlign="center"
					bg={useColorModeValue('white', 'gray.800')}>
					<DropZoneTableHeader />
					{statuses.map(({ name, valid, imgSrc = '', size = '-' }, idx) => (
						<SimpleGrid
							key={`${name}-${idx}`}
							spacingY={3}
							columns={{ base: 1, sm: 5 }}
							w="full"
							py={2}
							px={10}
							verticalAlign="middle"
							fontWeight="hairline">
							<Box mx="2" display="flex" justifyContent="center">
								<Image
									htmlHeight="55px"
									htmlWidth="55px"
									src={imgSrc}
									fallback={<Icon as={MdError} />}
								/>
							</Box>
							<Text
								as="em"
								textOverflow="ellipsis"
								overflow="hidden"
								whiteSpace="nowrap"
								textAlign="center">
								{name}
							</Text>
							<Box>
								<Text as="samp">{size}</Text>
							</Box>
							<Box>
								{valid ? (
									<Icon as={VscCheck} color="green.400" />
								) : (
									<Icon as={VscClose} color="red.400" />
								)}
							</Box>
							<Button
								colorScheme="red"
								size="sm"
								width="50%"
								onClick={() => handleRemove(idx)}>
								Remove
							</Button>
						</SimpleGrid>
					))}
				</Flex>
				<Button colorScheme="twitter" borderRadius="none">
					Upload All
				</Button>
			</Stack>
		</Flex>
	);
}

function DropZoneTableHeader() {
	return (
		<SimpleGrid
			spacingY={3}
			columns={{ base: 1, sm: 5 }}
			w={{ base: 100, sm: 'full' }}
			textTransform="uppercase"
			bg={useColorModeValue('gray.100', 'gray.700')}
			color={useColorModeValue('gray.500', 'gray.800')}
			py={{ base: 1, sm: 4 }}
			px={{ base: 2, sm: 10 }}
			fontSize="sm"
			fontWeight="extrabold">
			<Text>Display</Text>
			<Text>File Name</Text>
			<Text>Size</Text>
			<Text>Valid</Text>
		</SimpleGrid>
	);
}

interface IDropZoneTableProps {
	statuses: FileInfoTypes[];
	handleRemove: (id: number) => void;
}

interface IDropZoneInitialText {
	handleAdd: (files: FileList | null) => Promise<void>;
}