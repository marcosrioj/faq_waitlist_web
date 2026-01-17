"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { defaultLocale, isLocale, localeLabels, locales } from "@/i18n/config";
import { COOKIE_MAX_AGE_YEAR, LOCALE_COOKIE } from "@/lib/constants";
import { setCookie } from "@/lib/client-cookies";
import { trackEvent } from "@/lib/track";

type LanguageSwitcherProps = {
  locale: Locale;
};

const localeFlags: Record<Locale, string> = {
  en: "\u{1F1FA}\u{1F1F8}",
  "pt-br": "\u{1F1E7}\u{1F1F7}",
  es: "\u{1F1EA}\u{1F1F8}",
  fr: "\u{1F1EB}\u{1F1F7}",
  de: "\u{1F1E9}\u{1F1EA}",
  ru: "\u{1F1F7}\u{1F1FA}",
  "zh-cn": "\u{1F1E8}\u{1F1F3}",
  ar: "\u{1F1F8}\u{1F1E6}",
  ja: "\u{1F1EF}\u{1F1F5}"
};

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === locale || !pathname) {
      return;
    }

    const segments = pathname.split("/");
    const hasLocaleSegment = isLocale(segments[1]);
    const tailSegments = hasLocaleSegment ? segments.slice(2) : segments.slice(1);
    const nextSegments =
      nextLocale === defaultLocale
        ? tailSegments
        : [nextLocale, ...tailSegments];
    const nextPath = `/${nextSegments.join("/")}`;
    const normalizedPath = nextPath === "/" ? nextPath : nextPath.replace(/\/+$/, "");
    const query = searchParams?.toString();
    const url = query ? `${normalizedPath}?${query}` : normalizedPath;

    setCookie(LOCALE_COOKIE, nextLocale, { maxAge: COOKIE_MAX_AGE_YEAR });
    trackEvent("language_changed", locale, { from: locale, to: nextLocale });
    router.push(url);
  };

  return (
    <div className="language-switcher">
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="language-select"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} aria-label={localeLabels[loc]}>
            {localeFlags[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
