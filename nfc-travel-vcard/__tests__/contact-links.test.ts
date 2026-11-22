import { describe, it, expect } from 'vitest';
import { mailHref, telHref } from '@/lib/contact-links';

describe('telHref', () => {
  it('macht Telefonnummern antippbar', () => {
    expect(telHref('+49 171 1234567')).toBe('tel:+491711234567');
    expect(telHref('0171 / 123 45 67')).toBe('tel:01711234567');
    expect(telHref('0049 30 987654')).toBe('tel:+4930987654');
  });

  it('ignoriert leere oder unplausible Werte', () => {
    expect(telHref('')).toBeUndefined();
    expect(telHref(null)).toBeUndefined();
    expect(telHref('n/a')).toBeUndefined();
    expect(telHref('Geschützt – bitte "Besitzer benachrichtigen" nutzen.')).toBeUndefined();
  });
});

describe('mailHref', () => {
  it('erzeugt mailto für gültige Adressen', () => {
    expect(mailHref(' max@example.com ')).toBe('mailto:max@example.com');
  });

  it('ignoriert ungültige Werte', () => {
    expect(mailHref('max at example')).toBeUndefined();
    expect(mailHref(undefined)).toBeUndefined();
  });
});
