import InputChamber from '@/components/input';
import OutputPlay from '@/components/play';
import { OutputChamberProvider, usePlays } from '@/contexts/playground';
import Layout from './layout';

export default function Playground() {
	return (
		<Layout>
			<OutputChamberProvider>
				<InputChamber />
				<Plays />
			</OutputChamberProvider>
		</Layout>
	);
}

function Plays() {
	const { plays } = usePlays();

	const displayPlays = plays.map((play) => (
		<OutputPlay providerValue={play} key={play.uuid} uniqueId={play.uuid} />
	));

	return <>{displayPlays}</>;
}
