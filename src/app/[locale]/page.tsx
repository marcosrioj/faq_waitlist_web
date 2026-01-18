import { notFound, permanentRedirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getStructuredData } from "@/lib/structured-data";
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

export default async function Page({ params }: { params: { locale: Locale } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  if (params.locale === defaultLocale) {
    permanentRedirect("/");
  }

  const dictionary = await getDictionary(params.locale);
  const structuredData = getStructuredData(params.locale);

  return (
    <>
      <ModalProvider dictionary={dictionary} locale={params.locale}>
        <Navbar locale={params.locale} dictionary={dictionary} />
        <main id="main-content">
          <MainBanner dictionary={dictionary} />
          <Partner dictionary={dictionary} />
          <Features locale={params.locale} dictionary={dictionary} />
          <About dictionary={dictionary} />
          <HowItWorks dictionary={dictionary} />
          <Benefits dictionary={dictionary} />
          <Integrations dictionary={dictionary} />
          <Cto dictionary={dictionary} />
          <LatestNews dictionary={dictionary} />
          <SubscribeForm locale={params.locale} dictionary={dictionary} />
        </main>
        <Footer locale={params.locale} dictionary={dictionary} />
      </ModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
