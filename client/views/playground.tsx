import InputChamber from '@/components/input';
import PlayWithOutput from '@/components/play';
import { PlayGroundChamberProvider, usePlays } from '@/contexts/playground';
import Layout from './layout';

export default function Playground() {
	return (
		<Layout>
			<PlayGroundChamberProvider>
				<InputChamber />
				<Plays />
			</PlayGroundChamberProvider>
		</Layout>
	);
}

function Plays() {
	const { plays } = usePlays();

	const displayPlays = plays.map((play) => (
		<PlayWithOutput providerValue={play} key={play.uuid} uniqueId={play.uuid} />
	));

	return <>{displayPlays}</>;
}
