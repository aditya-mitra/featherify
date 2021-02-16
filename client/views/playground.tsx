import OutputPlay from '@/components/output';
import Layout from './layout';

export default function Playground() {
	return (
		<Layout>
			<OutputPlay
				providerValue={{
					blur: 18.5,
					dimensions: 6.0,
					format: 'base64',
					imgSrc: 'https://source.unsplash.com/random',
					scale: 1.1,
					code: 'text is overflowing when height is very big',
				}}
				uniqueId="9"
			/>
		</Layout>
	);
}

// var thisone = `
// {
//     backgroundImage: "linear-gradient(90deg, rgb(231,221,208) 12.5%,rgb(216,215,201) 12.5% 25%,rgb(225,220,204) 25% 37.5%,rgb(233,220,204) 37.5% 50%,rgb(225,218,205) 50% 62.5%,rgb(206,213,198) 62.5% 75%,rgb(226,221,203) 75% 87.5%,rgb(237,225,212) 87.5% 100%),linear-gradient(90deg, rgb(218,216,196) 12.5%,rgb(142,182,163) 12.5% 25%,rgb(125,168,155) 25% 37.5%,rgb(158,191,175) 37.5% 50%,rgb(189,208,193) 50% 62.5%,rgb(129,171,157) 62.5% 75%,rgb(131,180,164) 75% 87.5%,rgb(212,218,206) 87.5% 100%),linear-gradient(90deg, rgb(200,212,195) 12.5%,rgb(113,144,129) 12.5% 25%,rgb(107,94,69) 25% 37.5%,rgb(135,124,90) 37.5% 50%,rgb(148,137,107) 50% 62.5%,rgb(110,93,70) 62.5% 75%,rgb(109,145,134) 75% 87.5%,rgb(178,207,198) 87.5% 100%),linear-gradient(90deg, rgb(204,216,197) 12.5%,rgb(118,145,130) 12.5% 25%,rgb(131,93,58) 25% 37.5%,rgb(174,115,68) 37.5% 50%,rgb(155,94,50) 50% 62.5%,rgb(102,66,38) 62.5% 75%,rgb(95,135,126) 75% 87.5%,rgb(182,213,200) 87.5% 100%),linear-gradient(90deg, rgb(228,223,207) 12.5%,rgb(147,176,162) 12.5% 25%,rgb(131,103,74) 25% 37.5%,rgb(190,115,64) 37.5% 50%,rgb(154,96,51) 50% 62.5%,rgb(98,79,50) 62.5% 75%,rgb(99,128,109) 75% 87.5%,rgb(181,193,179) 87.5% 100%),linear-gradient(90deg, rgb(240,225,212) 12.5%,rgb(211,220,211) 12.5% 25%,rgb(135,161,145) 25% 37.5%,rgb(145,104,69) 37.5% 50%,rgb(104,82,51) 50% 62.5%,rgb(111,87,65) 62.5% 75%,rgb(95,67,41) 75% 87.5%,rgb(100,100,83) 87.5% 100%),linear-gradient(90deg, rgb(200,196,162) 12.5%,rgb(194,190,148) 12.5% 25%,rgb(187,193,155) 25% 37.5%,rgb(139,158,117) 37.5% 50%,rgb(120,157,133) 50% 62.5%,rgb(160,129,92) 62.5% 75%,rgb(129,95,65) 75% 87.5%,rgb(182,178,159) 87.5% 100%),linear-gradient(90deg, rgb(220,213,191) 12.5%,rgb(180,181,134) 12.5% 25%,rgb(169,170,113) 25% 37.5%,rgb(168,173,118) 37.5% 50%,rgb(164,180,136) 50% 62.5%,rgb(155,160,96) 62.5% 75%,rgb(192,187,155) 75% 87.5%,rgb(250,239,231) 87.5% 100%),linear-gradient(90deg, rgb(245,234,226) 12.5%,rgb(214,208,181) 12.5% 25%,rgb(182,184,137) 25% 37.5%,rgb(197,195,157) 37.5% 50%,rgb(165,168,109) 50% 62.5%,rgb(171,177,123) 62.5% 75%,rgb(176,182,128) 75% 87.5%,rgb(217,214,189) 87.5% 100%),linear-gradient(90deg, rgb(238,228,215) 12.5%,rgb(237,226,213) 12.5% 25%,rgb(237,226,213) 25% 37.5%,rgb(232,222,207) 37.5% 50%,rgb(195,189,147) 50% 62.5%,rgb(212,193,161) 62.5% 75%,rgb(204,189,153) 75% 87.5%,rgb(209,194,158) 87.5% 100%)",
//     backgroundPosition: "0 0 ,0 11.11111111111111%,0 22.22222222222222%,0 33.33333333333333%,0 44.44444444444444%,0 55.55555555555556%,0 66.66666666666666%,0 77.77777777777779%,0 88.88888888888889%,0 100%",
//     backgroundSize: "100% 10%",
//     backgroundRepeat: "no-repeat",
//     filter: "blur(15px)",
//     transform: "scale(1.2)"
// }
// `;
