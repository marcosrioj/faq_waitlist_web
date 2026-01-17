import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

export type UtmField = (typeof UTM_FIELDS)[number];

export type UtmValues = Partial<Record<UtmField, string>>;

export function extractUtmFromSearch(params: URLSearchParams): UtmValues {
  const utm: UtmValues = {};
  for (const field of UTM_FIELDS) {
    const value = params.get(field);
    if (value) {
      utm[field] = value;
    }
  }
  return utm;
}

export function getUtmFromCookies(cookies: ReadonlyRequestCookies): UtmValues {
  const utm: UtmValues = {};
  for (const field of UTM_FIELDS) {
    const value = cookies.get(field)?.value;
    if (value) {
      utm[field] = value;
    }
  }
  return utm;
}
