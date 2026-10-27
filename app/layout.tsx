import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Why Choose Bepchan?',
  description: 'Bepchan: game-specific acceleration, connection recovery, protocol-aware optimization and more.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
