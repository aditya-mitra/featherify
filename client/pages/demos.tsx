import type { GetStaticProps } from 'next';

import Layout from '@/components/universal/layout';
import fetchDemoPageData from '@/lib/fetchDemoPageData';
import Demo from '@/components/demo';
import type { SuccessFeatherType } from '@/types/index';

export default function Demos(props: IProps) {
	return (
		<Layout>
			{props.feathers.map((feather) => (
				<Demo feather={feather} key={feather.uuid} />
			))}
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
	const feathers = await fetchDemoPageData();

	return {
		props: {
			feathers,
		},
	};
};

interface IProps {
	feathers: SuccessFeatherType[];
}
