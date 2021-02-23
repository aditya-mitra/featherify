import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

export default function Featherify({ Component }: AppProps) {
	return (
		<ChakraProvider>
			<Component />
		</ChakraProvider>
	);
}
