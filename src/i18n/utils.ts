import { DEFAULT_LOCALE, LOCALES, type Locale } from '../consts';
import { localeDateTag, ui } from './ui';

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

export function t(locale: Locale) {
  return ui[locale];
}

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return clean ? `${base}/${locale}/${clean}/` : `${base}/${locale}/`;
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(localeDateTag[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(text: string, locale: Locale): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} ${ui[locale].blog.minRead}`;
}
