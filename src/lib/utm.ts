export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

export type UtmField = (typeof UTM_FIELDS)[number];

export type UtmValues = Partial<Record<UtmField, string>>;
