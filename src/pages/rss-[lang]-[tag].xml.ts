import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LOCALES, type Locale } from '../consts';
import { ui } from '../i18n/ui';
import { getPublishedPosts, postSlug } from '../content-utils';
import { slugifyTag } from '../i18n/utils';

export async function getStaticPaths() {
  const all = await getPublishedPosts();
  const paths: Array<{
    params: { lang: Locale; tag: string };
    props: { label: string };
  }> = [];

  for (const lang of LOCALES) {
    const tagMap = new Map<string, string>();
    for (const p of all) {
      if (p.data.lang !== lang) continue;
      for (const tag of p.data.tags) {
        const slug = slugifyTag(tag);
        if (!tagMap.has(slug)) tagMap.set(slug, tag);
      }
    }
    for (const [slug, label] of tagMap) {
      paths.push({ params: { lang, tag: slug }, props: { label } });
    }
  }
  return paths;
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const tag = context.params.tag as string;
  const { label } = context.props as { label: string };
  const t = ui[lang];

  const posts = (await getPublishedPosts(lang)).filter((p) =>
    p.data.tags.some((x) => slugifyTag(x) === tag),
  );

  return rss({
    title: `${t.siteTitle} · #${label}`,
    description: `${t.blog.subtitle} (#${label})`,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${lang}/blog/${postSlug(post)}/`,
        categories: post.data.tags,
      })),
  });
}
