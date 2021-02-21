import axios from 'axios';

const dyna = axios.create({
	baseURL: 'http://localhost:8000/api/manipulate',
	timeout: 10 * 1000,
	method: 'POST',
});

export async function getDynaImageFromFiles(): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000);
		console.log('dyna');
	});
}
