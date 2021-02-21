import InputChamber from '@/components/input';
import OutputPlay from '@/components/output';
import { OutputChamberProvider, usePlays } from '@/contexts/output';
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
		<OutputPlay providerValue={play} key={play.name} uniqueId={play.name} />
	));

	return <>{displayPlays}</>;
}
