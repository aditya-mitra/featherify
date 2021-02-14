import BuiltUsing from '@/components/builtUsing';
import HeroText from '@/components/heroText';
import Layout from './layouts';

export default function Home() {
	return (
		<Layout>
			<HeroText />
			<BuiltUsing />
		</Layout>
	);
}
