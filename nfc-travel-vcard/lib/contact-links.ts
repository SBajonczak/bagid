/**
 * Macht Kontaktdaten auf der Finder-Seite antippbar (Anrufen / E-Mail),
 * damit Finder den Besitzer ohne Abtippen erreichen.
 */

/** tel:-Link aus einer Telefonnummer; undefined bei leeren/unplausiblen Werten. */
export function telHref(value?: string | null): string | undefined {
  if (!value || !value.trim()) return undefined;
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 5) return undefined;
  const prefix = trimmed.startsWith('+') ? '+' : trimmed.startsWith('00') ? '+' : '';
  const normalized = trimmed.startsWith('00') ? digits.slice(2) : digits;
  return `tel:${prefix}${normalized}`;
}

/** mailto:-Link, nur für plausible E-Mail-Adressen. */
export function mailHref(value?: string | null): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? `mailto:${v}` : undefined;
}
