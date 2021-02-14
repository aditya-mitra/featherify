import NextLink from 'next/link';
import { Box, Button, Container, Divider, Stack, Text } from '@chakra-ui/react';
import { GiLightningHelix } from 'react-icons/gi';
import { SiReadthedocs } from 'react-icons/si';

export default function HeroText() {
	return (
		<Box mb={20}>
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
							<NextLink href="/play">
								<Button
									h="4rem"
									px="40px"
									fontSize="1.2rem"
									as="a"
									size="lg"
									colorScheme="teal"
									rightIcon={<GiLightningHelix fontSize="1.2em" />}>
									Playground
								</Button>
							</NextLink>
							<NextLink href="/docs">
								<Button
									as="a"
									size="lg"
									h="4rem"
									px="40px"
									fontSize="1.2rem"
									colorScheme="orange"
									rightIcon={<SiReadthedocs fontSize="1.1em" />}>
									Documentation
								</Button>
							</NextLink>
						</Stack>
					</Box>
				</Container>
			</Box>

			<Divider />
		</Box>
	);
}
