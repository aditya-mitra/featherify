import { memo } from 'react';
import { Box, GridItem, Grid } from '@chakra-ui/react';

import { InputImage, OutputImage } from '@/components/output/images';
import ControlInputs from '@/components/output/controlInputs';
import CodeBlock from '@/components/output/codeBlock';
import { ControlProvider, IOutputPlayProps } from '@/contexts/control';

function OutputPlay({ providerValue }: IOutputPlayProps) {
	// memoize the individual components at the last moment
	return (
		<Box px="8">
			<Grid h="200px" templateColumns="repeat(4, 1fr)" gap={4}>
				<ControlProvider providerValue={providerValue}>
					<GridItem>
						<ControlInputs />
					</GridItem>
					<GridItem bg="papayawhip" color="blue">
						<InputImage src={providerValue.imgSrc} />
					</GridItem>
					<GridItem bg="tomato">
						<OutputImage />
					</GridItem>
					<GridItem>
						<CodeBlock />
					</GridItem>
				</ControlProvider>
			</Grid>
		</Box>
	);
}

export default memo(
	OutputPlay,
	(prevProps, nextProps) => prevProps.uniqueId !== nextProps.uniqueId
);
