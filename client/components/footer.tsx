import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';

import { Logo } from './logo';

// needs remodification - can use the footer on chakra-ui website

export default function Footer() {
	return (
		<Box as="footer" role="contentinfo" py="6">
			<Flex
				direction={{ base: 'column', md: 'row' }}
				maxW={{ base: 'xl', md: '7xl' }}
				mx="auto"
				px={{ base: '6', md: '8' }}
				align="center"
				justify="center">
				<a aria-current="page" aria-label="Back to Home page" href="/" rel="home">
					<Logo h="6" iconColor="blue.600" />
				</a>
				<Stack
					my={{ base: '6', md: 0 }}
					direction={{ base: 'column', md: 'row' }}
					marginStart={{ md: '8' }}
					fontSize="sm"
					spacing={{ base: '2', md: '8' }}
					textAlign={{ base: 'center', md: 'start' }}>
					<Text>
						Built with ♥ by{' '}
						<Link isExternal href="https://aditya-mitra.github.io">
							Aditya Mitra
						</Link>
					</Text>
				</Stack>
			</Flex>
		</Box>
	);
}
