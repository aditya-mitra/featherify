import { Flex, Container, Heading, Stack, Text, Button } from '@chakra-ui/react';

export default function CallToActionWithIllustration() {
	return (
		<Container maxW="5xl">
			<Stack
				textAlign="center"
				align="center"
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}>
				<Heading
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
					Featherify your Image
				</Heading>
				<Text fontSize={{ base: 'lg', lg: 'xl' }} opacity={0.7} maxW="2xl">
					<strong>Featherify</strong> is a fast and fully customizable application which
					allows you to dynamically generate a blurred image for your image.
				</Text>
				<Stack spacing={6} direction="row">
					<Button
						rounded={'full'}
						px={6}
						colorScheme="orange"
						bg="orange.400"
						_hover={{ bg: 'orange.500' }}>
						PlayGround
					</Button>
					<Button rounded="full" px={6}>
						Documentation
					</Button>
				</Stack>
				<Flex w="full">
					<h1>Illustration Image Pending</h1>
				</Flex>
			</Stack>
		</Container>
	);
}
