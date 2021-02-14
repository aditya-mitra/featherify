import { ReactNode } from 'react';
import Footer from '@/components/footer';

export default function Layout({ children: WrappedComponents }: { children: ReactNode }) {
	return (
		<div>
			{WrappedComponents}
			<Footer />
		</div>
	);
}
