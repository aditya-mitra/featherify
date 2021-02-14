import { chakra, useColorModeValue } from '@chakra-ui/react';

export default function Header() {
	const bg = useColorModeValue('white', 'gray.800');
	return (
		<chakra.header
			transition="box-shadow 0.2s"
			pos="fixed"
			top="0"
			zIndex="3"
			bg={bg}
			left="0"
			right="0"
			borderTop="6px solid"
			borderTopColor="teal.400"
			width="full">
			<chakra.div height="4.5rem" mx="auto" maxW="1200px"></chakra.div>
		</chakra.header>
	);
}
