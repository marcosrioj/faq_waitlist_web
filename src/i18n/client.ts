import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export async function getClientDictionary(locale: Locale): Promise<Dictionary> {
  const dict = await import(`./${locale}.json`);
  return dict.default as Dictionary;
}
