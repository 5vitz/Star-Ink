import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StarINK | Luxury Streetwear & PoD 2.0',
  description: 'StarINK — Plataforma de Moda Contemporânea, Print on Demand 2.0 e Alta Frequência.',
  keywords: ['Streetwear', 'Print on Demand', 'Oversized', 'Moda Autoral', 'StarINK'],
  authors: [{ name: 'StarINK Team' }],
  robots: 'index, follow',
  icons: {
    icon: '/LOGO/LOGO_VAZADA.png',
    shortcut: '/LOGO/LOGO_VAZADA.png',
    apple: '/LOGO/LOGO_VAZADA.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
