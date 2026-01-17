import { LOCALE_COOKIE } from "@/lib/constants";

export const locales = [
  "en",
  "pt-br",
  "es",
  "fr",
  "de",
  "ru",
  "zh-cn",
  "ar",
  "ja"
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-br": "Portuguese (Brazil)",
  es: "Espanol",
  fr: "Francais",
  de: "Deutsch",
  ru: "Russkiy",
  "zh-cn": "Zhongwen (Simplified)",
  ar: "Al-Arabiyyah",
  ja: "Nihongo"
};

export const rtlLocales = new Set<Locale>(["ar"]);

export function isLocale(value?: string | null): value is Locale {
  if (!value) {
    return false;
  }
  return locales.includes(value as Locale);
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.has(locale);
}

const localeAlias: Record<string, Locale> = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  pt: "pt-br",
  "pt-br": "pt-br",
  es: "es",
  fr: "fr",
  de: "de",
  ru: "ru",
  zh: "zh-cn",
  "zh-cn": "zh-cn",
  "zh-hans": "zh-cn",
  ar: "ar",
  ja: "ja"
};

export function normalizeLocale(input: string): Locale | null {
  const normalized = input.trim().toLowerCase();
  if (localeAlias[normalized]) {
    return localeAlias[normalized];
  }
  const base = normalized.split("-")[0];
  return localeAlias[base] ?? null;
}

export function detectLocale(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }
  const tokens = acceptLanguageHeader
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .filter(Boolean);

  for (const token of tokens) {
    const detected = normalizeLocale(token);
    if (detected) {
      return detected;
    }
  }
  return defaultLocale;
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1]?.toLowerCase();
  return isLocale(segment) ? segment : null;
}

export function getLocaleFromCookie(cookieValue?: string): Locale | null {
  return isLocale(cookieValue) ? cookieValue : null;
}

export { LOCALE_COOKIE };
