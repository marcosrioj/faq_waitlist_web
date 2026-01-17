import "server-only";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./en.json"),
  "pt-br": () => import("./pt-br.json"),
  es: () => import("./es.json"),
  fr: () => import("./fr.json"),
  de: () => import("./de.json"),
  ru: () => import("./ru.json"),
  "zh-cn": () => import("./zh-cn.json"),
  ar: () => import("./ar.json"),
  ja: () => import("./ja.json")
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await dictionaries[locale]()).default;
}
