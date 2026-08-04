import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StarINK | Luxury Streetwear & PoD 2.0',
  description: 'StarINK — Plataforma de Moda Contemporânea, Print on Demand 2.0 e Alta Frequência.',
  keywords: ['Streetwear', 'Print on Demand', 'Oversized', 'Moda Autoral', 'StarINK'],
  authors: [{ name: 'StarINK Team' }],
  robots: 'index, follow',
  icons: {
    icon: '/LOGO/LOGO_FundoPreto.png',
    shortcut: '/LOGO/LOGO_FundoPreto.png',
    apple: '/LOGO/LOGO_FundoPreto.png',
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
