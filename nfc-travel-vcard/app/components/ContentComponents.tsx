/**
 * Content Page Components
 * Reusable components for Info Hub pages
 */

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Info } from 'lucide-react';

/**
 * TL;DR Section Component
 * Quick summary at the top of content pages
 */
export function TldrSection({ 
  title, 
  points, 
  children 
}: { 
  title?: string; 
  points?: string[]; 
  children?: React.ReactNode 
}) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
      <div className="flex items-start gap-3">
        <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
        <div className="text-slate-700 leading-relaxed">
          {title && <h3 className="font-semibold text-blue-900 mb-3">{title}</h3>}
          {points && points.length > 0 && (
            <ul className="space-y-2">
              {points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Step-by-Step Section Component
 */
export function StepSection({
  steps,
}: {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
}) {
  return (
    <div className="space-y-6 my-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex gap-4 p-6 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">{step.description}</p>
          </div>
          {step.icon && <div className="flex-shrink-0 text-slate-400">{step.icon}</div>}
        </div>
      ))}
    </div>
  );
}

/**
 * Problems & Solutions Accordion Component
 */
export function ProblemsSection({
  items,
}: {
  items: Array<{ problem: string; solution: string }>;
}) {
  return (
    <div className="space-y-4 my-12">
      {items.map((item, index) => (
        <details
          key={index}
          className="group bg-white border border-slate-200 rounded-lg overflow-hidden"
        >
          <summary className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="font-semibold text-slate-900">{item.problem}</span>
            <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-90" />
          </summary>
          <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
            {item.solution}
          </div>
        </details>
      ))}
    </div>
  );
}

/**
 * Related Links Section Component
 */
export function RelatedLinksSection({
  title = "Weiterführende Artikel",
  links,
}: {
  title?: string;
  links: Array<{ href: string; title: string }>;
}) {
  if (!links || links.length === 0) return null;
  
  return (
    <div className="bg-slate-50 rounded-lg p-8 my-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 transition-transform group-hover:translate-x-1" />
            <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
              {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * CTA Section Component
 * Call-to-action with primary and secondary buttons
 */
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
  // Support both old and new interface
  const mainText = title || description || 'Bereit loszulegen?';
  const mainButtonText = buttonText || primaryText || 'Jetzt kaufen';
  const mainButtonHref = buttonLink || primaryHref || 'https://bag-tag.de/de#shop';
  const hasSecondary = secondaryText && secondaryHref;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 my-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        {title || 'Bereit loszulegen?'}
      </h2>
      {description && (
        <p className="text-blue-100 text-lg mb-6">{description}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <a
          href={mainButtonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl"
        >
          <ShoppingBag className="h-5 w-5" />
          {mainButtonText}
        </a>
        {hasSecondary && (
          <Link
            href={secondaryHref!}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all"
          >
            {secondaryText}
            <ChevronRight className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * FAQ Section Component for Content Pages
 */
export function ContentFaqSection({
  title,
  faqs,
}: {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-90 flex-shrink-0" />
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

/**
 * Content Page Layout Wrapper
 * Standard layout for all content pages
 */
export function ContentPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-slate max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}

/**
 * Breadcrumb Component
 */
export function Breadcrumb({ items }: { items: Array<{ name: string; href?: string; url?: string }> }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 opacity-75" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const link = item.href || item.url;
        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
            {link ? (
              <Link
                href={link}
                className="hover:text-slate-600 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-500">{item.name}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
