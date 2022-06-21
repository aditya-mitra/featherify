import { featherCall } from './axios';

export async function wakeUp(): Promise<boolean> {
	return featherCall({
		headers: { 'Content-Type': 'multipart/form-data' },
		method: 'GET',
	})
		.then((response) => response.data)
		.then((data) => {
			return data.status === 'online';
		})
		.catch(() => {
			return false;
		});
}
