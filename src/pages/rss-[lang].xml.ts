import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LOCALES, type Locale } from '../consts';
import { ui } from '../i18n/ui';
import { getPublishedPosts, postSlug } from '../content-utils';

export async function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = ui[lang];
  const posts = await getPublishedPosts(lang);
  return rss({
    title: t.siteTitle,
    description: t.siteDescription,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${lang}/blog/${postSlug(post)}/`,
      })),
  });
}
