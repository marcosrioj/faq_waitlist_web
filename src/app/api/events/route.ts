import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isEventType } from "@/lib/event-types";
import { isLocale } from "@/i18n/config";
import { COOKIE_MAX_AGE_YEAR, LEAD_COOKIE, SESSION_COOKIE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(ip, 60);
  if (!limit.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";
  if (!isEventType(type)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const locale = isLocale(body.locale as string) ? (body.locale as string) : "en";
  const metadata =
    typeof body.metadata === "object" && body.metadata !== null
      ? (body.metadata as Record<string, unknown>)
      : undefined;

  const cookieStore = cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value ?? crypto.randomUUID();
  const leadId = cookieStore.get(LEAD_COOKIE)?.value;

  await prisma.event.create({
    data: {
      sessionId,
      leadId,
      type,
      metadata,
      locale
    }
  });

  const response = NextResponse.json({ ok: true });
  if (!cookieStore.get(SESSION_COOKIE)) {
    response.cookies.set(SESSION_COOKIE, sessionId, {
      path: "/",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_YEAR
    });
  }

  return response;
}
