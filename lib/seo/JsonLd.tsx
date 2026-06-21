/**
 * Renders structured data as a <script type="application/ld+json"> tag.
 *
 * Follows the Next.js JSON-LD guide: serialise with JSON.stringify and replace
 * `<` with its unicode escape to prevent XSS. `data` may be a single schema
 * node or an array of nodes (Google parses a top-level array of @context'd
 * objects). Server-safe (no client hooks) so it can render in any tree.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
