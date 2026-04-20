import type { Locale } from '../consts';

type UIStrings = {
  siteTitle: string;
  siteDescription: string;
  nav: {
    home: string;
    blog: string;
    about: string;
  };
  home: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaRead: string;
    ctaAbout: string;
    latestPosts: string;
    topics: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    backToList: string;
    updatedOn: string;
    publishedOn: string;
    minRead: string;
  };
  about: {
    title: string;
    intro: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
  };
  language: {
    label: string;
  };
};

export const ui: Record<Locale, UIStrings> = {
  en: {
    siteTitle: 'SAP Dev Notes',
    siteDescription:
      'Tutorials, deep dives, and recipes for SAP, SAP BTP, ABAP, Fiori, and modern SAP development.',
    nav: { home: 'Home', blog: 'Blog', about: 'About' },
    home: {
      heroKicker: 'SAP · BTP · ABAP · Fiori',
      heroTitle: 'Practical notes for modern SAP developers',
      heroSubtitle:
        'Hands-on articles on ABAP Cloud, the RESTful Application Programming model, CAP, Fiori Elements, and BTP services — with code you can copy.',
      ctaRead: 'Read the blog',
      ctaAbout: 'About this site',
      latestPosts: 'Latest posts',
      topics: 'Topics',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Articles about SAP development, BTP, ABAP and Fiori.',
      readMore: 'Read more',
      backToList: '← Back to all posts',
      updatedOn: 'Last updated on',
      publishedOn: 'Published on',
      minRead: 'min read',
    },
    about: {
      title: 'About',
      intro:
        'SAP Dev Notes is a trilingual blog about SAP, SAP BTP, ABAP, Fiori, and modern SAP development. Written by and for working SAP engineers.',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with Astro & Tailwind CSS.',
    },
    theme: { toggle: 'Toggle color scheme', light: 'Light', dark: 'Dark' },
    language: { label: 'Language' },
  },
  tr: {
    siteTitle: 'SAP Geliştirici Notları',
    siteDescription:
      'SAP, SAP BTP, ABAP, Fiori ve modern SAP geliştirme için pratik yazılar, derinlemesine incelemeler ve tarifler.',
    nav: { home: 'Anasayfa', blog: 'Blog', about: 'Hakkında' },
    home: {
      heroKicker: 'SAP · BTP · ABAP · Fiori',
      heroTitle: 'Modern SAP geliştiricileri için pratik notlar',
      heroSubtitle:
        'ABAP Cloud, RAP, CAP, Fiori Elements ve BTP servisleri hakkında kopyalayıp kullanabileceğiniz örneklerle dolu yazılar.',
      ctaRead: 'Bloga göz at',
      ctaAbout: 'Site hakkında',
      latestPosts: 'Son yazılar',
      topics: 'Konular',
    },
    blog: {
      title: 'Blog',
      subtitle: 'SAP geliştirme, BTP, ABAP ve Fiori üzerine yazılar.',
      readMore: 'Devamını oku',
      backToList: '← Tüm yazılara dön',
      updatedOn: 'Son güncelleme',
      publishedOn: 'Yayınlandı',
      minRead: 'dk okuma',
    },
    about: {
      title: 'Hakkında',
      intro:
        'SAP Geliştirici Notları; SAP, SAP BTP, ABAP, Fiori ve modern SAP geliştirme üzerine üç dilli bir blogdur. SAP mühendisleri tarafından, SAP mühendisleri için yazılır.',
    },
    footer: {
      rights: 'Tüm hakları saklıdır.',
      builtWith: 'Astro ve Tailwind CSS ile geliştirildi.',
    },
    theme: { toggle: 'Renk temasını değiştir', light: 'Açık', dark: 'Koyu' },
    language: { label: 'Dil' },
  },
  de: {
    siteTitle: 'SAP Dev Notes',
    siteDescription:
      'Tutorials, Deep Dives und Rezepte zu SAP, SAP BTP, ABAP, Fiori und moderner SAP-Entwicklung.',
    nav: { home: 'Startseite', blog: 'Blog', about: 'Über' },
    home: {
      heroKicker: 'SAP · BTP · ABAP · Fiori',
      heroTitle: 'Praktische Notizen für moderne SAP-Entwickler',
      heroSubtitle:
        'Praxisnahe Artikel zu ABAP Cloud, RESTful Application Programming, CAP, Fiori Elements und BTP-Diensten — mit Code zum Mitnehmen.',
      ctaRead: 'Zum Blog',
      ctaAbout: 'Über diese Seite',
      latestPosts: 'Neueste Beiträge',
      topics: 'Themen',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Artikel zu SAP-Entwicklung, BTP, ABAP und Fiori.',
      readMore: 'Weiterlesen',
      backToList: '← Zurück zur Übersicht',
      updatedOn: 'Zuletzt aktualisiert am',
      publishedOn: 'Veröffentlicht am',
      minRead: 'Min. Lesezeit',
    },
    about: {
      title: 'Über',
      intro:
        'SAP Dev Notes ist ein dreisprachiger Blog über SAP, SAP BTP, ABAP, Fiori und moderne SAP-Entwicklung — geschrieben von und für SAP-Entwickler.',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      builtWith: 'Gebaut mit Astro und Tailwind CSS.',
    },
    theme: { toggle: 'Farbschema umschalten', light: 'Hell', dark: 'Dunkel' },
    language: { label: 'Sprache' },
  },
};

export const languageNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
};

export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  tr: 'tr',
  de: 'de',
};

export const localeDateTag: Record<Locale, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
};
