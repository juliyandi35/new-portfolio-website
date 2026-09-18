import type { Metadata, Viewport } from 'next';
import './globals.css';
import { person } from '@/lib/content';
import SiteNav from '@/components/Nav/SiteNav';
import MotionProvider from '@/components/MotionProvider';

const siteUrl = 'https://juliyandi35.github.io/new-portfolio-website';

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: `${person.name}, ${person.credential} — ${person.tagline}`,
    template: `%s — ${person.name}`,
  },
  description: person.summary,
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${person.name}, ${person.credential} — ${person.tagline}`,
    description: person.summary,
    siteName: person.name,
    images: ['images/social-preview.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${person.name}, ${person.credential} — ${person.tagline}`,
    description: person.summary,
    images: ['images/social-preview.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0f1a',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.tagline,
  email: `mailto:${person.email}`,
  url: siteUrl,
  sameAs: [person.linkedin, person.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <MotionProvider>
          <SiteNav />
          <main id="main-content">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
