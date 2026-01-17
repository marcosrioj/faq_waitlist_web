import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isLocale } from "@/i18n/config";
import { COOKIE_MAX_AGE_YEAR, LEAD_COOKIE, SESSION_COOKIE } from "@/lib/constants";
import { budgetRangeOptions } from "@/lib/options";
import { getUtmFromCookies } from "@/lib/utm";
import { isValidEmail, sanitizeText } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(ip, 10);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const honeypot = sanitizeText(body.company, 120);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const email = sanitizeText(body.email, 120)?.toLowerCase() ?? "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const name = sanitizeText(body.name, 120);
  const budgetRange = budgetRangeOptions.includes(
    body.budgetRange as (typeof budgetRangeOptions)[number]
  )
    ? (body.budgetRange as (typeof budgetRangeOptions)[number])
    : null;

  const locale = isLocale(body.locale as string) ? (body.locale as string) : "en";

  const cookieStore = cookies();
  const utmFromCookies = getUtmFromCookies(cookieStore);
  const utm = {
    utm_source: typeof body.utm_source === "string" ? body.utm_source : utmFromCookies.utm_source,
    utm_medium: typeof body.utm_medium === "string" ? body.utm_medium : utmFromCookies.utm_medium,
    utm_campaign:
      typeof body.utm_campaign === "string"
        ? body.utm_campaign
        : utmFromCookies.utm_campaign,
    utm_content:
      typeof body.utm_content === "string" ? body.utm_content : utmFromCookies.utm_content,
    utm_term: typeof body.utm_term === "string" ? body.utm_term : utmFromCookies.utm_term
  };

  const lead = await prisma.lead.upsert({
    where: { email },
    update: {
      name,
      budgetRange,
      locale,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      utmTerm: utm.utm_term
    },
    create: {
      email,
      name,
      budgetRange,
      locale,
      utmSource: utm.utm_source,
      utmMedium: utm.utm_medium,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      utmTerm: utm.utm_term
    }
  });

  const sessionId = cookieStore.get(SESSION_COOKIE)?.value ?? crypto.randomUUID();

  await prisma.event.create({
    data: {
      sessionId,
      leadId: lead.id,
      type: "lead_submitted",
      metadata: { budgetRange },
      locale
    }
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(LEAD_COOKIE, lead.id, {
    path: "/",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_YEAR
  });

  if (!cookieStore.get(SESSION_COOKIE)) {
    response.cookies.set(SESSION_COOKIE, sessionId, {
      path: "/",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_YEAR
    });
  }

  return response;
}
