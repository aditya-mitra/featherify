import type { ReactNode } from 'react';
import NavbarContent from '@/components/navbar';
import Footer from '@/components/footer';

export default function Layout({ children: WrappedComponents }: { children: ReactNode }) {
	return (
		<div>
			<NavbarContent />
			{WrappedComponents}
			<Footer />
		</div>
	);
}
