import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { formatDate, getAuthors, getCollections } from '@/lib/content';

type AuthorPageProps = {
  params: {
    author: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((author) => ({ author: author.slug }));
}

export function generateMetadata({ params }: AuthorPageProps): Metadata {
  const author = getAuthors().find((entry) => entry.slug === params.author);

  return author
    ? {
        title: author.name,
        description: author.description,
        keywords: [author.name, 'poésie', 'recueil', 'poème', 'poète'],
      }
    : {};
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthors().find((entry) => entry.slug === params.author);

  if (!author) {
    notFound();
  }

  const collections = getCollections(author);
  const poemCount = collections.reduce(
    (total, collection) => total + collection.poems.length,
    0,
  );

  return (
    <main className="page-shell">
      <SiteHeader backHref="/#auteurs" backLabel="Tous les auteurs" />

      <section className="author-intro" aria-labelledby="author-title">
        <Image
          className="author-avatar author-avatar-large"
          src={author.avatar}
          alt=""
          width={88}
          height={88}
          priority
        />
        <div className="author-intro-copy">
          <p className="eyebrow">AUTEUR</p>
          <h1 id="author-title">
            {author.name}<span className="title-accent">.</span>
          </h1>
          <p className="intro-description">{author.description}</p>
          <div className="intro-stats" aria-label={`${collections.length} recueils, ${poemCount} poésies`}>
            <span>{String(collections.length).padStart(2, '0')} recueils</span>
            <span className="stat-divider" aria-hidden="true">/</span>
            <span>{String(poemCount).padStart(2, '0')} poésies</span>
          </div>
        </div>
      </section>

      <section className="collections-section" aria-labelledby="collections-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SES TEXTES</p>
            <h2 id="collections-title">
              Recueils<span className="title-accent">.</span>
            </h2>
          </div>
          <p className="section-count">
            {String(collections.length).padStart(2, '0')} groupes
          </p>
        </div>

        {collections.length > 0 ? (
          <div className="collection-list">
            {collections.map((collection, collectionIndex) => (
              <section
                className="collection"
                key={collection.name}
                aria-labelledby={`collection-${collectionIndex}`}
              >
                <div className="collection-heading">
                  <span className="collection-number">
                    {String(collectionIndex + 1).padStart(2, '0')}
                  </span>
                  <h3 id={`collection-${collectionIndex}`}>{collection.name}</h3>
                  <span className="collection-count">
                    {String(collection.poems.length).padStart(2, '0')}{' '}
                    {collection.poems.length === 1 ? 'poésie' : 'poésies'}
                  </span>
                </div>
                <div className="poem-list">
                  {collection.poems.map((poem, poemIndex) => (
                    <details
                      className="poem"
                      key={`${poem.date}-${poem.title}`}
                      open={collectionIndex === 0 && poemIndex === 0}
                    >
                      <summary className="poem-summary">
                        <span className="poem-date">{formatDate(poem.date)}</span>
                        <span className="poem-title">{poem.title}</span>
                        <span className="poem-toggle" aria-hidden="true" />
                      </summary>
                      <div className="poem-content">
                        <p className="poem-text">{poem.text}</p>
                        <div className="poem-meta">
                          <span>{poem.author}</span>
                          <span>{poem.year}</span>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Cet auteur n’a pas encore publié de poésie.</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
