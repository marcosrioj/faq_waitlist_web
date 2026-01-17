import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  getLocaleFromCookie,
  getLocaleFromPath
} from "./src/i18n/config";
import {
  COOKIE_MAX_AGE_YEAR,
  LOCALE_COOKIE,
  SESSION_COOKIE
} from "./src/lib/constants";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const localeFromPath = getLocaleFromPath(pathname);
  const cookieLocale = getLocaleFromCookie(request.cookies.get(LOCALE_COOKIE)?.value);
  let response = NextResponse.next();

  const defaultPrefix = `/${defaultLocale}`;
  if (pathname === defaultPrefix || pathname.startsWith(`${defaultPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(defaultPrefix, "") || "/";
    response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, defaultLocale, {
      path: "/",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_YEAR
    });
  } else if (!localeFromPath) {
    if (!cookieLocale || cookieLocale !== defaultLocale) {
      response.cookies.set(LOCALE_COOKIE, defaultLocale, {
        path: "/",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE_YEAR
      });
    }
  } else if (localeFromPath && (!cookieLocale || cookieLocale !== localeFromPath)) {
    response.cookies.set(LOCALE_COOKIE, localeFromPath, {
      path: "/",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_YEAR
    });
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) {
    response.cookies.set(SESSION_COOKIE, crypto.randomUUID(), {
      path: "/",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE_YEAR
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"]
};
