import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { formatDate, getAuthors, getAuthorPoems } from '@/lib/content';

type PoemPageProps = {
  params: {
    author: string;
    poem: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().flatMap((author) =>
    getAuthorPoems(author).map((poem) => ({
      author: author.slug,
      poem: poem.slug,
    })),
  );
}

export function generateMetadata({ params }: PoemPageProps): Metadata {
  const author = getAuthors().find((entry) => entry.slug === params.author);
  const poem = author
    ? getAuthorPoems(author).find((entry) => entry.slug === params.poem)
    : undefined;

  if (!author || !poem) {
    return {};
  }

  const description = poem.text.replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    title: `${poem.title} — ${author.name}`,
    description: description || `${poem.title}, un poème de ${author.name}.`,
    keywords: [poem.title, author.name, poem.collection, 'poésie', 'poème'],
    alternates: {
      canonical: `/${author.slug}/${poem.slug}/`,
    },
    openGraph: {
      title: `${poem.title} — ${author.name}`,
      description: description || `${poem.title}, un poème de ${author.name}.`,
      url: `/${author.slug}/${poem.slug}/`,
      type: 'article',
      publishedTime: new Date(`${poem.date}T00:00:00.000Z`).toISOString(),
      authors: [author.name],
      images: [{ url: author.avatar, alt: author.name }],
    },
    twitter: {
      card: 'summary',
      title: `${poem.title} — ${author.name}`,
      description: description || `${poem.title}, un poème de ${author.name}.`,
      images: [author.avatar],
    },
  };
}

export default function PoemPage({ params }: PoemPageProps) {
  const author = getAuthors().find((entry) => entry.slug === params.author);
  const poem = author
    ? getAuthorPoems(author).find((entry) => entry.slug === params.poem)
    : undefined;

  if (!author || !poem) {
    notFound();
  }

  return (
    <main className="page-shell">
      <SiteHeader
        backHref={`/${author.slug}/#recueils`}
        backLabel={`Tous les textes de ${author.name}`}
      />

      <article className="single-poem" aria-labelledby="poem-title">
        <p className="eyebrow">
          <Link href={`/${author.slug}/`}>{author.name}</Link>
          <span aria-hidden="true"> / </span>
          {poem.collection}
        </p>
        <h1 id="poem-title">{poem.title}</h1>
        <p className="single-poem-date">{formatDate(poem.date)}</p>
        <div className="single-poem-divider" aria-hidden="true" />
        <p className="single-poem-text">{poem.text}</p>
        <footer className="single-poem-meta">
          <Link href={`/${author.slug}/`}>{poem.author}</Link>
          <span>{poem.year}</span>
        </footer>
      </article>

      <SiteFooter />
    </main>
  );
}
