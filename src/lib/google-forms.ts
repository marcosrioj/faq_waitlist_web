import type { UtmValues } from "@/lib/utm";

export type LeadSubmission = {
  email: string;
  name?: string;
  budget?: string;
  locale: string;
  utm?: UtmValues;
};

type GoogleFormsConfig = {
  actionUrl: string;
  entries: {
    email: string;
    name: string;
    budget: string;
    locale: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
  };
};

function getGoogleFormsConfig(): GoogleFormsConfig {
  return {
    actionUrl: process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION ?? "",
    entries: {
      email: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL ?? "",
      name: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME ?? "",
      budget: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_BUDGET ?? "",
      locale: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_LOCALE ?? "",
      utmSource: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_SOURCE ?? "",
      utmMedium: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_MEDIUM ?? "",
      utmCampaign: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_CAMPAIGN ?? "",
      utmContent: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_CONTENT ?? "",
      utmTerm: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_TERM ?? ""
    }
  };
}

function appendIfPresent(
  params: URLSearchParams,
  entryId: string,
  value?: string
): void {
  if (!entryId || !value) {
    return;
  }
  params.append(entryId, value);
}

export async function submitLeadToGoogleForms(
  payload: LeadSubmission
): Promise<boolean> {
  const config = getGoogleFormsConfig();
  if (!config.actionUrl || !config.entries.email) {
    return false;
  }

  const params = new URLSearchParams();
  appendIfPresent(params, config.entries.email, payload.email);
  appendIfPresent(params, config.entries.name, payload.name);
  appendIfPresent(params, config.entries.budget, payload.budget);
  appendIfPresent(params, config.entries.locale, payload.locale);

  appendIfPresent(params, config.entries.utmSource, payload.utm?.utm_source);
  appendIfPresent(params, config.entries.utmMedium, payload.utm?.utm_medium);
  appendIfPresent(params, config.entries.utmCampaign, payload.utm?.utm_campaign);
  appendIfPresent(params, config.entries.utmContent, payload.utm?.utm_content);
  appendIfPresent(params, config.entries.utmTerm, payload.utm?.utm_term);

  try {
    await fetch(config.actionUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });
    return true;
  } catch {
    return false;
  }
}
