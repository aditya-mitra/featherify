import BuiltUsing from '@/components/landing/builtUsing';
import HeroText from '@/components/landing/heroText';
import Layout from './layout';

export default function Home() {
	return (
		<Layout>
			<HeroText />
			<BuiltUsing />
		</Layout>
	);
}
