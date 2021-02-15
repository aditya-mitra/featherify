import BuiltUsing from '@/components/builtUsing';
import HeroText from '@/components/heroText';
import Layout from './layout';

export default function Home() {
	return (
		<Layout>
			<HeroText />
			<BuiltUsing />
		</Layout>
	);
}
