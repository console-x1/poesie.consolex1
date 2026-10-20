import type { MetadataRoute } from 'next';
import { getAuthors, getAuthorPoems } from '@/lib/content';

const siteUrl = 'https://poesie.consolex1.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const authors = getAuthors();
  const authorPages: MetadataRoute.Sitemap = authors.map((author) => {
    const poems = getAuthorPoems(author);
    const latestPoemDate = poems
      .map((poem) => poem.date)
      .sort((first, second) => second.localeCompare(first))[0];

    return {
      url: `${siteUrl}/${author.slug}/`,
      ...(latestPoemDate
        ? { lastModified: new Date(`${latestPoemDate}T00:00:00.000Z`) }
        : {}),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });
  const poemPages: MetadataRoute.Sitemap = authors.flatMap((author) =>
    getAuthorPoems(author).map((poem) => ({
      url: `${siteUrl}/${encodeURIComponent(author.slug)}/${encodeURIComponent(poem.slug)}/`,
      lastModified: new Date(`${poem.date}T00:00:00.000Z`),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  );

  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...authorPages,
    ...poemPages,
  ];
}
