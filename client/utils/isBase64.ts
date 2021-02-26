export default function isBase64(code: string | object): code is string {
	return typeof code === 'string';
}
