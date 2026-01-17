import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { SITE_NAME, getBaseUrl } from "@/lib/site";

export function getStructuredData(locale: Locale) {
  const baseUrl = getBaseUrl().replace(/\/$/, "");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: baseUrl
  };

  const websitePath = locale === defaultLocale ? "" : `/${locale}`;
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${baseUrl}${websitePath}`
  };

  const faqExample = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Example FAQ (sample schema only)",
    description: "Sample schema for demonstration only.",
    mainEntity: [
      {
        "@type": "Question",
        name: "Example question",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Example answer."
        }
      }
    ]
  };

  return [organization, website, faqExample];
}
