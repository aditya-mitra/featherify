import { memo } from 'react';
import { Box, GridItem, Grid, Tooltip, CloseButton } from '@chakra-ui/react';

import { InputImage, OutputImage } from '@/components/output/images';
import ControlInputs from '@/components/output/controlInputs';
import CodeBlock from '@/components/output/codeBlock';
import { PlayControlProvider, IPlayControlProps } from '@/contexts/control';

function PlayWithOutput({ providerValue, uniqueId }: IPlayControlProps) {
	return (
		<Box
			px="8"
			pt="10"
			h="550px"
			borderWidth="1px"
			borderRadius="lg"
			mx="4"
			pos="relative"
			d="flex"
			alignItems="center"
			justifyContent="center">
			<Grid templateColumns="repeat(auto-fit, minmax(200px,1fr))" gap={4} mt="3">
				{/* Start The Provider is put here to prevent unnecessary rerendering */}
				<PlayControlProvider providerValue={providerValue}>
					<GridItem>
						<ControlInputs />
					</GridItem>
					<GridItem>
						<InputImage src={providerValue.imgSrc} />
					</GridItem>
					<GridItem>
						<OutputImage />
					</GridItem>
					<GridItem>
						<CodeBlock />
					</GridItem>
				</PlayControlProvider>
				{/* End Provider */}
			</Grid>
			<RemoveItemButton id={uniqueId} />
		</Box>
	);
}

function RemoveItemButton({ id }: { id: string | number }) {
	return (
		<Tooltip label="Remove this item" hasArrow>
			<CloseButton
				size="sm"
				position="absolute"
				top="-3"
				right="-3"
				backgroundColor="red.100"
				_hover={{ bg: 'red.500' }}
				_focus={{ bg: 'red.500' }}
				onClick={() => console.log('removing ' + id)}
			/>
		</Tooltip>
	);
}

export default memo(
	PlayWithOutput,
	(prevProps, nextProps) => prevProps.uniqueId === nextProps.uniqueId
);
