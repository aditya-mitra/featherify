import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: {
				_focus: {
					bg: 'red.400',
				},
			},
		},
	},
});

export default theme;
