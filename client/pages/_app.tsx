import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/lib/chakraTheme';

export default function Featherify({ Component }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component />
		</ChakraProvider>
	);
}
