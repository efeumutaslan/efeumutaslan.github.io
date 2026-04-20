import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './consts';

const isDev = import.meta.env.DEV;

export function isPublished(post: CollectionEntry<'blog'>): boolean {
  if (post.data.draft && !isDev) return false;
  if (post.data.pubDate.valueOf() > Date.now() && !isDev) return false;
  return true;
}

export async function getPublishedPosts(lang?: Locale): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog');
  return all.filter((p) => isPublished(p) && (lang ? p.data.lang === lang : true));
}

export function postSlug(post: CollectionEntry<'blog'>): string {
  return post.id.replace(/^(en|tr|de)\//, '');
}

export async function getSeriesPosts(
  seriesId: string,
  lang: Locale,
): Promise<CollectionEntry<'blog'>[]> {
  const all = await getPublishedPosts(lang);
  return all
    .filter((p) => p.data.series?.id === seriesId)
    .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));
}
