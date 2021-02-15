import { Box, Button, Container, Stack, Text } from '@chakra-ui/react';
import { GiLightningHelix } from 'react-icons/gi';
import { SiReadthedocs } from 'react-icons/si';

export default function HeroText() {
	return (
		<Box mb={0}>
			<Box as="section" pt={{ base: '10rem' }} pb={{ base: '0', md: '5rem' }}>
				<Container>
					<Box textAlign="center">
						<Text
							bgGradient="linear(to-l, #7928CA,#FF0080)"
							bgClip="text"
							maxW="16ch"
							mx="auto"
							fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
							fontFamily="heading"
							letterSpacing="tighter"
							fontWeight="extrabold"
							mb="16px"
							lineHeight="1.2">
							Dynamically Generate Image Placeholders
						</Text>

						<Text
							maxW="560px"
							mx="auto"
							opacity={0.7}
							fontSize={{ base: 'lg', lg: 'xl' }}
							mt="6">
							<strong>DynaImage</strong> is a fast and fully customizable application
							which allows you to dynamically generate a blurred image for your image.
						</Text>

						<Stack
							mt="10"
							spacing="4"
							justify="center"
							direction={{ base: 'column', sm: 'row' }}>
							<Button
								as="a"
								href="/play"
								h="4rem"
								px="40px"
								fontSize="1.2rem"
								size="lg"
								colorScheme="teal"
								rightIcon={<GiLightningHelix fontSize="1.2em" />}>
								Playground
							</Button>
							<Button
								as="a"
								href="/docs"
								size="lg"
								h="4rem"
								px="40px"
								fontSize="1.2rem"
								colorScheme="orange"
								rightIcon={<SiReadthedocs fontSize="1.1em" />}>
								Documentation
							</Button>
						</Stack>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}
