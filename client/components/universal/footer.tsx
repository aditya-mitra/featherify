import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Box as="footer" role="contentinfo" py="6">
			<Flex
				direction={{ base: 'column', md: 'row' }}
				maxW={{ base: 'xl', md: '7xl' }}
				mx="auto"
				px={{ base: '6', md: '8' }}
				align="center"
				justify="center"
				position="relative">
				<Stack
					my={{ base: '6', md: 0 }}
					direction={{ base: 'column', md: 'row' }}
					fontSize="sm">
					<Box
						mt="-12"
						backgroundImage={`url("/images/logo_no_bg.png")`}
						backgroundSize="cover"
						height="80px"
						width="190px"
						filter="scale(2)"
					/>
				</Stack>
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
