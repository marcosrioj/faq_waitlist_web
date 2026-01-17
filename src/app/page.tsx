import type { Metadata } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getStructuredData } from "@/lib/structured-data";
import { getBaseUrl } from "@/lib/site";
import UtmCapture from "@/components/UtmCapture";
import EventTracker from "@/components/EventTracker";
import ModalProvider from "@/components/ModalProvider";
import Navbar from "@/components/Fintech/Navbar";
import MainBanner from "@/components/Fintech/MainBanner";
import Partner from "@/components/Fintech/Partner";
import Features from "@/components/Fintech/Features";
import About from "@/components/Fintech/About";
import HowItWorks from "@/components/Fintech/HowItWorks";
import Benefits from "@/components/Fintech/Benefits";
import Integrations from "@/components/Fintech/Integrations";
import Cto from "@/components/Fintech/Cto";
import LatestNews from "@/components/Fintech/LatestNews";
import SubscribeForm from "@/components/Fintech/SubscribeForm";
import Footer from "@/components/Fintech/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(defaultLocale);
  const baseUrl = new URL(getBaseUrl());
  const base = baseUrl.origin;

  return {
    metadataBase: baseUrl,
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: "/",
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
      url: base,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.ogTitle ?? dictionary.meta.title,
      description: dictionary.meta.ogDescription ?? dictionary.meta.description
    }
  };
}

export default async function RootPage() {
  const dictionary = await getDictionary(defaultLocale);
  const structuredData = getStructuredData(defaultLocale);

  return (
    <>
      <UtmCapture />
      <EventTracker locale={defaultLocale} />
      <ModalProvider dictionary={dictionary} locale={defaultLocale}>
        <Navbar locale={defaultLocale} dictionary={dictionary} />
        <main id="main-content">
          <MainBanner locale={defaultLocale} dictionary={dictionary} />
          <Partner dictionary={dictionary} />
          <Features locale={defaultLocale} dictionary={dictionary} />
          <About dictionary={dictionary} />
          <HowItWorks dictionary={dictionary} />
          <Benefits locale={defaultLocale} dictionary={dictionary} />
          <Integrations dictionary={dictionary} />
          <Cto locale={defaultLocale} dictionary={dictionary} />
          <LatestNews dictionary={dictionary} />
          <SubscribeForm locale={defaultLocale} dictionary={dictionary} />
        </main>
        <Footer locale={defaultLocale} dictionary={dictionary} />
      </ModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
