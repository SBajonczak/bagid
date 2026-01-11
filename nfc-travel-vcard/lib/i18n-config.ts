export const i18n = {
  defaultLocale: 'de',
  locales: ['de', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
};
