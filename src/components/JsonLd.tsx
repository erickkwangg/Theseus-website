const SITE_URL = "https://theseus.network";

const DEFAULT_DATE_PUBLISHED = "2026-01-15";
const DEFAULT_DATE_MODIFIED = "2026-04-29";

const ORG_AUTHOR = {
  "@type": "Organization",
  name: "Theseus AI Labs",
  url: SITE_URL,
} as const;

type DocsPageJsonLdProps = {
  /** Display title shown in breadcrumb (e.g., "AIVM"). */
  title: string;
  /** Page description used for the TechArticle schema. */
  description: string;
  /** Path under /docs, e.g. "aivm" or "agentic-smart-contracts". */
  slug: string;
  /** ISO 8601 date the page was first published. Defaults to repo-wide constant. */
  datePublished?: string;
  /** ISO 8601 date the page was last meaningfully updated. Defaults to repo-wide constant. */
  dateModified?: string;
};

/**
 * Emits both a `BreadcrumbList` and a `TechArticle` schema for a docs page.
 * Used as a leaf in each `/docs/[slug]/page.tsx`.
 */
export function DocsPageJsonLd({
  title,
  description,
  slug,
  datePublished = DEFAULT_DATE_PUBLISHED,
  dateModified = DEFAULT_DATE_MODIFIED,
}: DocsPageJsonLdProps) {
  const url = `${SITE_URL}/docs/${slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Theseus",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Docs",
        item: `${SITE_URL}/docs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    inLanguage: "en",
    datePublished,
    dateModified,
    author: ORG_AUTHOR,
    isPartOf: {
      "@type": "WebSite",
      name: "Theseus Docs",
      url: `${SITE_URL}/docs`,
    },
    publisher: {
      "@type": "Organization",
      name: "Theseus",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/theseus-white.svg`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
    </>
  );
}

type HowToStep = {
  /** Short step name (e.g. "Install the CLI"). */
  name: string;
  /** Step description in plain text. */
  text: string;
  /** Optional URL fragment that anchors this step on the page. */
  url?: string;
};

type HowToJsonLdProps = {
  /** HowTo name (e.g. "Deploy your first Theseus agent"). */
  name: string;
  /** Short description of what completing the steps achieves. */
  description: string;
  /** Page URL where this HowTo lives. */
  url: string;
  /** Ordered steps. */
  steps: HowToStep[];
  /** Optional list of free-text prerequisites (rendered as `supply`). */
  supplies?: string[];
  /** Optional list of free-text tools required (rendered as `tool`). */
  tools?: string[];
  /** Total time in ISO 8601 duration (e.g. `PT15M`). */
  totalTime?: string;
};

/** Schema.org HowTo for step-by-step guides like the quickstart. */
export function HowToJsonLd({
  name,
  description,
  url,
  steps,
  supplies,
  tools,
  totalTime,
}: HowToJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    inLanguage: "en",
    ...(totalTime && { totalTime }),
    ...(supplies && {
      supply: supplies.map((s) => ({ "@type": "HowToSupply", name: s })),
    }),
    ...(tools && {
      tool: tools.map((t) => ({ "@type": "HowToTool", name: t })),
    }),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type DefinedTermSetProps = {
  /** The set's display name (e.g. "Theseus Glossary"). */
  name: string;
  /** Page URL where the glossary lives. */
  url: string;
  /** Each term and its definition. `link` is a path under the site (e.g. `/docs/aivm`). */
  terms: Array<{ term: string; definition: string; link?: string }>;
};

const SCHEMA_SITE_URL = "https://theseus.network";

/** Schema.org DefinedTermSet — high-leverage GEO win for glossary pages. */
export function DefinedTermSetJsonLd({ name, url, terms }: DefinedTermSetProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    url,
    inLanguage: "en",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: url,
      ...(t.link && { url: `${SCHEMA_SITE_URL}${t.link}` }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type CollectionPageItem = {
  /** Item title (e.g. "AIVM"). */
  name: string;
  /** Path under the site (e.g. `/docs/aivm`). */
  path: string;
  /** Optional one-line description. */
  description?: string;
};

type CollectionPageJsonLdProps = {
  /** Page name (e.g. "Theseus Developer Docs"). */
  name: string;
  /** Page description. */
  description: string;
  /** Page URL (e.g. `https://theseus.network/docs`). */
  url: string;
  /** Items the collection lists. */
  items: CollectionPageItem[];
};

/** Schema.org CollectionPage — for hub/index pages that list other pages. */
export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: CollectionPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Theseus", url: SCHEMA_SITE_URL },
    hasPart: items.map((item) => ({
      "@type": "TechArticle",
      name: item.name,
      url: `${SCHEMA_SITE_URL}${item.path}`,
      ...(item.description && { description: item.description }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type FaqJsonLdProps = {
  /** Array of question/answer pairs. Answer is plain text (no HTML). */
  faqs: Array<{ question: string; answer: string }>;
};

/** FAQPage rich-result schema. Use on a page with public Q/A content. */
export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
