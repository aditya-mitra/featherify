import { GetStaticProps } from 'next';
import { Box } from '@chakra-ui/react';

import Layout from '@/components/universal/layout';

export default function Demos(props: IProps) {
	console.log(props, 'are the props');
	return (
		<Layout>
			{props.done}
			<Box my="8" width="85%">
				<img src="https://source.unsplash.com/random" alt="broken" loading="lazy" />
			</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
	return {
		props: {
			done: 'king',
		},
	};
};

interface IProps {
	done: string;
}
