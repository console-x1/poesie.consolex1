import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'consolex1 | Poésies',
    template: '%s | consolex1',
  },
  description: 'Découvrez les poésies de consolex1',
  keywords: [
    'poésie', 
    'poèmes', 
    'écriture', 
    'carnet', 
    'journal', 
    'littérature', 
    'créativité', 
    'inspiration', 
    'émotions', 
    'réflexions', 
    'pensées', 
    'art', 
    'culture',
    'amour',
    'ce que je tais',
    'Je pourrais te le dire'
  ],
  icons: {
    icon: '/avatar.png',
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  openGraph: {
    title: 'consolex1 | Poésies',
    description: 'Découvrez les poésies de consolex1',
    url: 'https://poesie.consolex1.com',
    siteName: 'consolex1',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: 'consolex1 — Poésies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'consolex1 — Poésies',
    description:
      'Découvrez les poésies de consolex1',
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
