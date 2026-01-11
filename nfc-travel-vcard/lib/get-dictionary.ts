import 'server-only';
import type { Locale } from './i18n-config';
import { messages } from './i18n';

export const getDictionary = async (locale: Locale) => {
  return messages[locale] || messages.de;
};
