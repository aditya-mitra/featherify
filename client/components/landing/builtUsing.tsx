import type { ReactNode } from 'react';
import { Heading, Stack, Box, Container, SimpleGrid, Text } from '@chakra-ui/react';
import { SiDjango, SiNextDotJs, SiPython } from 'react-icons/si';

export default function BuiltUsing() {
	return (
		<Container maxW="1280px" bg="teal.500" color="white" py="6.5rem">
			<Box maxW="760px" mx="auto" textAlign="center" mb="56px">
				<HeadingText />
			</Box>
			<Box as="section">
				<Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
						<Feature title="Django" icon={<SiDjango />}>
							Django and Django Rest Framework together support the backend of
							DynaImages
						</Feature>
						<Feature title="NextJS" icon={<SiNextDotJs />}>
							NextJS is the React Framework we used for supporting our Playground and
							this Website.
						</Feature>
						<Feature title="Pillow" icon={<SiPython />}>
							Pillow is the Python Image Processing Library that we are using to
							generate the awesome image placeholders.
						</Feature>
					</SimpleGrid>
				</Box>
			</Box>
		</Container>
	);
}

function Feature(props: FeatureProps) {
	const { title, children, icon } = props;
	return (
		<Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
			<Box fontSize="6xl">{icon}</Box>
			<Stack spacing="1">
				<Text fontWeight="extrabold" fontSize="lg">
					{title}
				</Text>
				<Box opacity={0.7}>{children}</Box>
			</Stack>
		</Stack>
	);
}

function HeadingText() {
	return (
		<Heading
			mt="4"
			fontWeight="extrabold"
			size="3xl"
			maxW="14ch"
			mx="auto"
			letterSpacing="tighter">
			<Box as="span" bgClip="text" color="white">
				Built Using
			</Box>
		</Heading>
	);
}

interface FeatureProps {
	title: string;
	children: string;
	icon: ReactNode;
}
