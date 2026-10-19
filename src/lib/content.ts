import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Author = {
  slug: string;
  name: string;
  description: string;
  avatar: string;
};

export type Poem = {
  date: string;
  title: string;
  text: string;
  year: string;
  author: string;
};

export type Collection = {
  name: string;
  poems: Poem[];
};

const contentDirectory = join(process.cwd(), 'content');

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getAuthors(): Author[] {
  return readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const profilePath = join(contentDirectory, slug, 'profile.json');

      if (!existsSync(profilePath)) {
        throw new Error(`Profil manquant : ${profilePath}`);
      }

      const profile: unknown = JSON.parse(readFileSync(profilePath, 'utf8'));

      if (
        typeof profile !== 'object' ||
        profile === null ||
        !('name' in profile) ||
        !isNonEmptyString(profile.name) ||
        !('description' in profile) ||
        !isNonEmptyString(profile.description) ||
        !('avatar' in profile) ||
        !isNonEmptyString(profile.avatar) ||
        !profile.avatar.startsWith('/')
      ) {
        throw new Error(
          `Profil invalide : ${profilePath}. Les champs name, description et avatar (chemin public commençant par /) sont requis.`,
        );
      }

      return {
        slug,
        name: profile.name.trim(),
        description: profile.description.trim(),
        avatar: profile.avatar.trim(),
      };
    })
    .sort((first, second) => first.name.localeCompare(second.name, 'fr'));
}

export function getPoemCount(author: Author): number {
  return readCollections(author).reduce(
    (total, collection) => total + collection.poems.length,
    0,
  );
}

export function getCollections(author: Author): Collection[] {
  return readCollections(author);
}

function readCollections(author: Author): Collection[] {
  const authorDirectory = join(contentDirectory, author.slug);
  const poemsDirectory = join(authorDirectory, 'poesies');

  if (!existsSync(poemsDirectory)) {
    return [];
  }

  const collectionNames = readdirSync(poemsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const orderPath = join(authorDirectory, 'ordre-recueils.json');
  const collectionOrder = existsSync(orderPath)
    ? JSON.parse(readFileSync(orderPath, 'utf8'))
    : [];

  if (
    !Array.isArray(collectionOrder) ||
    collectionOrder.some((name: unknown) => !isNonEmptyString(name)) ||
    new Set(collectionOrder).size !== collectionOrder.length
  ) {
    throw new Error(
      `Ordre des recueils invalide : ${orderPath}. Le fichier doit contenir une liste JSON de noms de dossiers sans doublons.`,
    );
  }

  const orderedNames = [
    ...collectionOrder.filter((name: string) => collectionNames.includes(name)),
    ...collectionNames
      .filter((name) => !collectionOrder.includes(name))
      .sort((first, second) => first.localeCompare(second, 'fr')),
  ];

  return orderedNames.map((name) => {
    const directory = join(poemsDirectory, name);
    const poems = readdirSync(directory)
      .filter((filename) => filename.toLowerCase().endsWith('.txt'))
      .sort((first, second) => second.localeCompare(first, 'fr'))
      .map((filename) => readPoem(join(directory, filename), filename));

    return { name, poems };
  }).filter((collection) => collection.poems.length > 0);
}

function readPoem(path: string, filename: string): Poem {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})_(.+)\.txt$/i);

  if (!match) {
    throw new Error(
      `Nom de fichier invalide : ${filename}. Format attendu : YYYY-MM-DD_Nom-du-poeme.txt`,
    );
  }

  const [, date, slug] = match;
  const [yearNumber, monthNumber, dayNumber] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(yearNumber, monthNumber - 1, dayNumber));

  if (
    parsedDate.getUTCFullYear() !== yearNumber ||
    parsedDate.getUTCMonth() !== monthNumber - 1 ||
    parsedDate.getUTCDate() !== dayNumber
  ) {
    throw new Error(`Date invalide dans le nom du fichier : ${filename}`);
  }

  const lines = readFileSync(path, 'utf8')
    .replace(/^\uFEFF/, '')
    .trimEnd()
    .split(/\r?\n/);
  const metadataStart = lines.length - 2;
  const title = lines[0]?.trim();
  const year = lines[metadataStart]?.trim();
  const author = lines[metadataStart + 1]?.trim();

  if (
    !title ||
    metadataStart < 2 ||
    lines[metadataStart - 1]?.trim() !== '' ||
    !year ||
    !/^\d{4}$/.test(year) ||
    !author
  ) {
    throw new Error(
      `Poésie invalide dans ${filename}. La première ligne doit contenir le titre ; termine le fichier par une ligne vide, l'année et le nom d'auteur.`,
    );
  }

  return {
    date,
    title,
    text: lines.slice(1, metadataStart - 1).join('\n').replace(/^\n+/, '').trimEnd(),
    year,
    author,
  };
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
