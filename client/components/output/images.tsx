export function InputImage({ src }: { src: string }) {
	return <img src={src} alt="random image" />;
}

export function OutputImage() {
	// needs refactoring for base64 and css codes
	return (
		<div>
			<img src="https://source.unsplash.com/random" alt="output image" />
		</div>
	);
}
