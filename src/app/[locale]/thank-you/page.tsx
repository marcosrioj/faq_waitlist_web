import { notFound, permanentRedirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Link from "next/link";
import ModalProvider from "@/components/ModalProvider";
import Navbar from "@/components/Fintech/Navbar";
import Footer from "@/components/Fintech/Footer";
import ThankYouTracker from "@/components/ThankYouTracker";

export default async function ThankYouPage({ params }: { params: { locale: Locale } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  if (params.locale === defaultLocale) {
    permanentRedirect("/thank-you");
  }

  const dictionary = await getDictionary(params.locale);

  return (
    <ModalProvider dictionary={dictionary} locale={params.locale}>
      <ThankYouTracker locale={params.locale} />
      <Navbar locale={params.locale} dictionary={dictionary} />
      <main className="section-pad">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {dictionary.thankYou.title}
          </h1>
          <p className="mt-4 text-base text-muted">{dictionary.thankYou.subtitle}</p>

          <div className="mt-10 rounded-3xl border border-sand-dark bg-white/80 p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-ink">{dictionary.thankYou.nextTitle}</h2>
            <p className="mt-2 text-sm text-muted">{dictionary.thankYou.nextSteps}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={params.locale === defaultLocale ? "/" : `/${params.locale}`}
                className="fintech-default-btn"
              >
                {dictionary.thankYou.backCta}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={params.locale} dictionary={dictionary} />
    </ModalProvider>
  );
}
