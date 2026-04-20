export const SITE_TITLE = 'SAP Dev Notes';
export const SITE_DESCRIPTION =
  'Tutorials, deep dives, and recipes for SAP, SAP BTP, ABAP, Fiori, and modern SAP development workflows.';
export const SITE_AUTHOR = 'SAP Dev Notes';
export const SITE_KEYWORDS = [
  'SAP',
  'SAP BTP',
  'SAP ABAP',
  'SAP Fiori',
  'SAPUI5',
  'CAP',
  'Cloud Application Programming Model',
  'RAP',
  'RESTful Application Programming Model',
  'SAP Development',
  'S/4HANA',
  'HANA',
];

export const LOCALES = ['en', 'tr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
