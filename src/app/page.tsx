import type { Metadata } from 'next';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const metadata: Metadata = {
  title: 'Mes poésies — console-x1',
  description: 'Poésies personnelles, recueils et fragments.',
};

type Poem = {
  date: string;
  title: string;
  text: string;
  collection: string;
  year: string;
  author: string;
};

type Collection = {
  name: string;
  poems: Poem[];
};

function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    throw new Error(`Date invalide dans le nom du fichier : ${date}`);
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
}

function getPoems(): Poem[] {
  const poemsDirectory = join(process.cwd(), 'src', 'content', 'poesies');

  return readdirSync(poemsDirectory)
    .filter((filename) => filename.toLowerCase().endsWith('.txt'))
    .sort((first, second) => second.localeCompare(first, 'fr'))
    .flatMap((filename) => {
      const match = filename.match(/^(\d{4}-\d{2}-\d{2})_(.+)\.txt$/i);

      if (!match) {
        throw new Error(
          `Nom de fichier invalide : ${filename}. Format attendu : YYYY-MM-DD_Nom-du-poeme.txt`,
        );
      }

      const [, date, slug] = match;
      const lines = readFileSync(join(poemsDirectory, filename), 'utf8')
        .replace(/^\uFEFF/, '')
        .trimEnd()
        .split(/\r?\n/);
      const metadataStart = lines.length - 3;
      const collection = lines[metadataStart]?.trim();
      const year = lines[metadataStart + 1]?.trim();
      const author = lines[metadataStart + 2]?.trim();

      if (
        metadataStart < 1 ||
        lines[metadataStart - 1]?.trim() !== '' ||
        !collection ||
        !year ||
        !/^\d{4}$/.test(year) ||
        !author
      ) {
        throw new Error(
          `Métadonnées manquantes ou invalides dans ${filename}. Ajoute une ligne vide, puis le recueil, l'année et le nom d'auteur en fin de fichier.`,
        );
      }

      const title = slug.replace(/[-_]+/g, ' ').trim();
      const textLines = lines.slice(0, metadataStart - 1);
      const firstLineIsTitle =
        textLines[0]?.trim().toLocaleLowerCase('fr-FR') ===
        title.toLocaleLowerCase('fr-FR');

      if (firstLineIsTitle) {
        textLines.shift();
      }

      const text = textLines.join('\n').replace(/^\n+/, '').trimEnd();

      return [{
        date: formatDate(date),
        title: title.charAt(0).toLocaleUpperCase('fr-FR') + title.slice(1),
        text,
        collection,
        year,
        author,
      }];
    });
}

function groupByCollection(poems: Poem[]): Collection[] {
  const collections = new Map<string, Poem[]>();

  for (const poem of poems) {
    const collection = collections.get(poem.collection) ?? [];
    collection.push(poem);
    collections.set(poem.collection, collection);
  }

  return Array.from(collections, ([name, collectionPoems]) => ({
    name,
    poems: collectionPoems,
  }));
}

export default function Home() {
  const poems = getPoems();
  const collections = groupByCollection(poems);

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#accueil" aria-label="console-x1, accueil">
          console-x1<span className="wordmark-dot">.</span>
        </a>
        <nav className="header-nav" aria-label="Navigation principale">
          <a href="#recueils">Poésies</a>
          <a href="https://me.consolex1.com">Portfolio <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="intro" id="accueil" aria-labelledby="intro-title">
        <p className="eyebrow">ÉCRITURE PERSONNELLE</p>
        <h1 id="intro-title">Mes poésies<span className="title-accent">.</span></h1>
        <p className="intro-description">Textes, recueils et fragments.</p>
        <div className="intro-stats" aria-label={`${collections.length} recueils, ${poems.length} poésies`}>
          <span>{String(collections.length).padStart(2, '0')} recueils</span>
          <span className="stat-divider" aria-hidden="true">/</span>
          <span>{String(poems.length).padStart(2, '0')} poésies</span>
        </div>
        <a className="scroll-link" href="#recueils">
          Parcourir <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="collections-section" id="recueils" aria-labelledby="poems-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">INDEX</p>
            <h2 id="poems-title">Recueils<span className="heading-period">.</span></h2>
          </div>
          <p className="section-count">{String(collections.length).padStart(2, '0')} groupes</p>
        </div>

        {collections.length > 0 ? (
          <div className="collection-list">
            {collections.map((collection, collectionIndex) => (
              <section className="collection" key={collection.name} aria-labelledby={`collection-${collectionIndex}`}>
                <div className="collection-heading">
                  <span className="collection-number">{String(collectionIndex + 1).padStart(2, '0')}</span>
                  <h3 id={`collection-${collectionIndex}`}>{collection.name}</h3>
                  <span className="collection-count">
                    {String(collection.poems.length).padStart(2, '0')} {collection.poems.length === 1 ? 'poésie' : 'poésies'}
                  </span>
                </div>
                <div className="poem-list">
                  {collection.poems.map((poem, poemIndex) => (
                    <details className="poem" key={`${poem.date}-${poem.title}`} open={collectionIndex === 0 && poemIndex === 0}>
                      <summary className="poem-summary">
                        <span className="poem-date">{poem.date}</span>
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
            <p>Aucune poésie pour le moment.</p>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#accueil">console-x1<span className="wordmark-dot">.</span></a>
        <span>© {new Date().getFullYear()}</span>
        <a href="https://me.consolex1.com">Portfolio <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
