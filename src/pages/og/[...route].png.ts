import { OGImageRoute } from 'astro-og-canvas';
import { LOCALES, SITE_TITLE, type Locale } from '../../consts';
import { getPublishedPosts, postSlug } from '../../content-utils';

type PageData = { title: string; description: string; tags: string[]; lang: Locale };

const posts = await getPublishedPosts();
const pages: Record<string, PageData> = {};

for (const post of posts) {
  pages[`${post.data.lang}/${postSlug(post)}`] = {
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    lang: post.data.lang,
  };
}

for (const lang of LOCALES) {
  pages[`${lang}/_home`] = {
    title: SITE_TITLE,
    description: 'SAP · BTP · ABAP · Fiori — practical notes for modern SAP developers.',
    tags: ['SAP', 'BTP', 'ABAP'],
    lang,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getSlug: (path) => path,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: { path: './public/favicon.svg', size: [64] },
    bgGradient: [
      [15, 23, 42],
      [30, 41, 59],
    ],
    border: { color: [79, 70, 229], width: 12, side: 'inline-start' },
    padding: 60,
    font: {
      title: { color: [248, 250, 252], size: 64, lineHeight: 1.15, weight: 'Bold' },
      description: { color: [203, 213, 225], size: 28, lineHeight: 1.4 },
    },
  }),
});
