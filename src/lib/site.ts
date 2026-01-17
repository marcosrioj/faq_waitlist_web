export const SITE_NAME = "FAQ.com.br";
export const DEFAULT_URL = "https://faq.com.br";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_URL;
}
