import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import EventTracker from "@/components/EventTracker";
import UtmCapture from "@/components/UtmCapture";
import { getBaseUrl } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const baseUrl = new URL(getBaseUrl());
  const base = baseUrl.origin;
  const canonicalPath = locale === defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: baseUrl,
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        locales.map((loc) => [
          loc,
          loc === defaultLocale ? base : `${base}/${loc}`
        ])
      )
    },
    openGraph: {
      title: dictionary.meta.ogTitle ?? dictionary.meta.title,
      description: dictionary.meta.ogDescription ?? dictionary.meta.description,
      url: locale === defaultLocale ? base : `${base}/${locale}`,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.ogTitle ?? dictionary.meta.title,
      description: dictionary.meta.ogDescription ?? dictionary.meta.description
    }
  };
}

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <>
      <UtmCapture />
      <EventTracker locale={params.locale} />
      {children}
    </>
  );
}
