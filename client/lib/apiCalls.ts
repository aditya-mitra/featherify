import axios from 'axios';

const BASEURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/manipulate' : 'amplify url';

const dyna = axios.create({
	baseURL: BASEURL,
	timeout: 10 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export async function getDynaImageFromFiles(formdata: FormData): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, 5000);
		console.log('dyna');
		console.log(formdata.getAll('images'), 'are the images');
		console.log(formdata.getAll('urls'), 'are the urls');
	});
}
