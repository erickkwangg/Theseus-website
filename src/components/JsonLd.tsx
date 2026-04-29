const SITE_URL = "https://theseus.network";

type DocsPageJsonLdProps = {
  /** Display title shown in breadcrumb (e.g., "AIVM"). */
  title: string;
  /** Page description used for the TechArticle schema. */
  description: string;
  /** Path under /docs, e.g. "aivm" or "agentic-smart-contracts". */
  slug: string;
};

/**
 * Emits both a `BreadcrumbList` and a `TechArticle` schema for a docs page.
 * Used as a leaf in each `/docs/[slug]/page.tsx`.
 */
export function DocsPageJsonLd({ title, description, slug }: DocsPageJsonLdProps) {
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
