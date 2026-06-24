import { NextRequest, NextResponse } from "next/server";

import { localeHtmlLang, locales, type Locale } from "./app/seo";

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const language of preferred) {
    const exact = locales.find((locale) => language === locale);
    if (exact) return exact;

    const base = language.split("-")[0];
    const baseMatch = locales.find((locale) => locale === base);
    if (baseMatch) return baseMatch;
  }

  return "en";
}

function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return locales.includes(segment as Locale) ? (segment as Locale) : "es";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", localeHtmlLang[localeFromPath(pathname)]);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
