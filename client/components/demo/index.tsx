import { useEffect, useRef, useState } from 'react';

import type { SuccessFeatherType } from '@/types/index';

export default function Demo({ feather }: IDemoProps) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	const hasLoaded = () => {
		setLoaded(true);
	};

	const divStyles = !loaded &&
		feather.styles && {
			...feather.styles,
			backgroundRepeat: 'no-repeat',
			filter: 'blur(12px)',
			width: '250px',
			height: '250px',
		};

	useEffect(() => {
		// if image is already cached
		if (imgRef.current?.complete === true) {
			hasLoaded();
		}
	}, []);

	return (
		<div style={divStyles ? divStyles : {}}>
			{loaded ? 'has loaded' : 'not loaded'}
			<img
				style={{ objectFit: 'cover', height: '250px', width: '250px' }}
				ref={imgRef}
				onLoad={hasLoaded}
				src={feather.name}
				alt={feather.name}
				loading="lazy"
			/>
		</div>
	);
}

interface IDemoProps {
	feather: SuccessFeatherType;
}
