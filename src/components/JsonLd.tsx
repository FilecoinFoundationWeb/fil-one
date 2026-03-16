/**
 * Injects a JSON-LD structured data script tag into the document.
 * Renders nothing visible — only used by search engine crawlers.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
