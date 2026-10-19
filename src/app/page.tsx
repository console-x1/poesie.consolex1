import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { getAuthors, getPoemCount } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Poésies — Des voix, des recueils',
  description: 'Un espace collectif pour lire les poésies de plusieurs auteurs.',
};

export default function Home() {
  const authors = getAuthors();

  return (
    <main className="page-shell">
      <SiteHeader backHref="#auteurs" backLabel="Les auteurs" />

      <section className="intro" aria-labelledby="intro-title">
        <p className="eyebrow">UN ESPACE POUR LES MOTS</p>
        <h1 id="intro-title">
          Des voix, des textes<span className="title-accent">.</span>
        </h1>
        <p className="intro-description">
          Des poésies personnelles, réunies au même endroit.
        </p>
        <div
          className="intro-stats"
          aria-label={`${authors.length} ${authors.length === 1 ? 'auteur' : 'auteurs'}`}
        >
          <span>
            {String(authors.length).padStart(2, '0')}{' '}
            {authors.length === 1 ? 'auteur' : 'auteurs'}
          </span>
        </div>
        <a className="scroll-link" href="#auteurs">
          Découvrir les auteurs <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="authors-section" id="auteurs" aria-labelledby="authors-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LES PLUMES</p>
            <h2 id="authors-title">
              Auteurs<span className="title-accent">.</span>
            </h2>
          </div>
          <p className="section-count">
            {String(authors.length).padStart(2, '0')}{' '}
            {authors.length === 1 ? 'profil' : 'profils'}
          </p>
        </div>

        {authors.length > 0 ? (
          <div className="author-grid">
            {authors.map((author, index) => (
              <Link
                className="author-card"
                href={`/${author.slug}/`}
                key={author.slug}
              >
                <div className="author-card-top">
                  <span className="author-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="author-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="author-card-profile">
                  <Image
                    className="author-avatar"
                    src={author.avatar}
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3>{author.name}</h3>
                    <span className="author-poem-count">
                      {getPoemCount(author)} poésies
                    </span>
                  </div>
                </div>
                <p className="author-description">{author.description}</p>
                <span className="author-card-link">
                  Lire ses textes <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Aucun auteur pour le moment.</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
