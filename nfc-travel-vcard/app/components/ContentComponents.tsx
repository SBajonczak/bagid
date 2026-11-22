import React from 'react';
import Link from 'next/link';
import { SHOP_PRODUCT_URL } from '@/lib/seo/site';

/*
 * Gemeinsame Bausteine der Ratgeber-/Hilfe-Seiten.
 * Gestaltung: app/components/content/content.css (Design-System wie Startseite).
 */

/** Kurzfassung oben auf Inhaltsseiten */
export function TldrSection({
  title,
  points,
  children,
}: {
  title?: string;
  points?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bt-tldr" aria-label={title || 'Kurz gesagt'}>
      {title && <h2 className="bt-tldr__title">{title}</h2>}
      {points && points.length > 0 && (
        <ul>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
      {children}
    </section>
  );
}

/** Schritt-für-Schritt-Anleitung (echte Reihenfolge → nummeriert) */
export function StepSection({
  steps,
}: {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
}) {
  return (
    <ol className="bt-stepsx">
      {steps.map((step, index) => (
        <li key={index}>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Probleme & Lösungen als aufklappbare Liste */
export function ProblemsSection({ items }: { items: Array<{ problem: string; solution: string }> }) {
  return (
    <div className="bt-faq bt-faq--content">
      {items.map((item, index) => (
        <details key={index}>
          <summary>
            <span>{item.problem}</span>
          </summary>
          <p>{item.solution}</p>
        </details>
      ))}
    </div>
  );
}

/** Weiterführende Links */
export function RelatedLinksSection({
  title = 'Weiterführende Artikel',
  links,
}: {
  title?: string;
  links: Array<{ href: string; title: string }>;
}) {
  if (!links || links.length === 0) return null;
  return (
    <nav className="bt-related" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="bt-link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Alte Platzhalter-Ziele, die es nicht gibt, auf echte Seiten umleiten. */
export function resolveCtaHref(href?: string): string {
  if (!href || href === 'https://bag-tag.de/de#shop' || href === '/de#shop') return SHOP_PRODUCT_URL;
  if (href === '/en/contact') return '/en/help';
  return href;
}

/** Abschluss mit Kauf-Button (Shopify) und optionalem zweiten Link */
export function CtaSection({
  title,
  description,
  buttonText,
  buttonLink,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}) {
  const mainButtonText = buttonText || primaryText || 'Jetzt kaufen';
  const mainButtonHref = resolveCtaHref(buttonLink || primaryHref);
  const external = /^https?:\/\//.test(mainButtonHref);
  const hasSecondary = secondaryText && secondaryHref;

  return (
    <section className="bt-cta" aria-label={title || 'Bag-Tag bestellen'}>
      <div>
        <h2>{title || 'Bereit für die nächste Reise?'}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="bt-cta__actions">
        {external ? (
          <a href={mainButtonHref} target="_blank" rel="noopener noreferrer" className="bt-btn bt-btn--primary">
            {mainButtonText}
          </a>
        ) : (
          <Link href={mainButtonHref} className="bt-btn bt-btn--primary">
            {mainButtonText}
          </Link>
        )}
        {hasSecondary && (
          <Link href={secondaryHref!} className="bt-link">
            {secondaryText}
          </Link>
        )}
      </div>
    </section>
  );
}

/** FAQ-Liste für Inhaltsseiten */
export function ContentFaqSection({
  title,
  faqs,
}: {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="bt-content-faq">
      <h2>{title}</h2>
      <div className="bt-faq bt-faq--content">
        {faqs.map((faq, index) => (
          <details key={index}>
            <summary>
              <h3 className="bt-faq__q">{faq.question}</h3>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Standard-Rahmen für Inhaltsseiten */
export function ContentPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bt-article-wrap">
      <article className="bt-article">{children}</article>
    </div>
  );
}

/** Brotkrumen-Navigation */
export function Breadcrumb({ items }: { items: Array<{ name: string; href?: string; url?: string }> }) {
  return (
    <nav className="bt-crumbs" aria-label="Breadcrumb">
      <ol className="bt-crumbs__list">
        {items.map((item, index) => {
          const link = item.href || item.url;
          const last = index === items.length - 1;
          return (
            <li key={index}>
              {link && !last ? <Link href={link}>{item.name}</Link> : <span aria-current={last ? 'page' : undefined}>{item.name}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
