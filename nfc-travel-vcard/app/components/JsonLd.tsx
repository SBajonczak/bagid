import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Serialisiert JSON-LD sicher für ein <script>-Tag: "<" wird escaped, damit
 * Inhalte wie "</script>" das Tag nicht vorzeitig schließen können.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
