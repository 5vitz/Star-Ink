import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star INK | Luxury Streetwear & PoD 2.0',
  description: 'Star INK — Plataforma de Moda Contemporânea, Print on Demand 2.0 e Alta Frequência.',
  keywords: ['Streetwear', 'Print on Demand', 'Oversized', 'Moda Autoral', 'Star INK'],
  authors: [{ name: 'Star INK Team' }],
  robots: 'index, follow',
  verification: {
    google: 'qv6nUyNFuBjanfBLI80JqwaWScZdSxaEg2UC4ENlK4w',
  },
  icons: {
    icon: '/LOGO/LOGO_VAZADA.png',
    shortcut: '/LOGO/LOGO_VAZADA.png',
    apple: '/LOGO/LOGO_VAZADA.png',
  },
};

import Providers from '@/components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-site-verification" content="qv6nUyNFuBjanfBLI80JqwaWScZdSxaEg2UC4ENlK4w" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
