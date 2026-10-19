import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://poesie.consolex1.com'),
  title: {
    default: 'Poésies — Des voix, des recueils',
    template: '%s | Poésies',
  },
  description: 'Un espace collectif pour lire les poésies de plusieurs auteurs.',
  keywords: [
    'poésie',
    'poèmes',
    'écriture',
    'littérature',
    'recueils',
    'auteurs',
  ],
  icons: {
    icon: '/avatar.png',
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  openGraph: {
    title: 'Poésies — Des voix, des recueils',
    description: 'Un espace collectif pour lire les poésies de plusieurs auteurs.',
    url: 'https://poesie.consolex1.com',
    siteName: 'Poésies',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Poésies — Des voix, des recueils',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poésies — Des voix, des recueils',
    description: 'Un espace collectif pour lire les poésies de plusieurs auteurs.',
    images: ['/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
