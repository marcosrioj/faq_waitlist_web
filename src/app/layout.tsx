import "./globals.css";
import "@/styles/bootstrap.min.css";
import "@/styles/boxicons.min.css";
import "@/styles/flaticon.css";
import "@/styles/style.css";
import "@/styles/responsive.css";
import "@/styles/rtl.css";

import type { CSSProperties, ReactNode } from "react";
import { Poppins } from "next/font/google";
import { defaultLocale, isLocale, isRtl } from "@/i18n/config";
import GoTop from "@/components/Layout/GoTop";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params?: { locale?: string };
}) {
  const locale = isLocale(params?.locale) ? params?.locale : defaultLocale;
  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const normalizedBasePath =
    rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");
  const basePath =
    normalizedBasePath && !normalizedBasePath.startsWith("/")
      ? `/${normalizedBasePath}`
      : normalizedBasePath;
  const imageBase = `${basePath}/images`;
  const cssVars = {
    "--base-path": basePath,
    "--bg-banner-bg1": `url(${imageBase}/banner-bg1.jpg)`,
    "--bg-funfacts": `url(${imageBase}/bigdata-analytics/funfacts-bg.jpg)`,
    "--bg-layer": `url(${imageBase}/layer.png)`,
    "--bg-oops": `url(${imageBase}/oops-bg.jpg)`,
    "--bg-banner": `url(${imageBase}/banner-bg.jpg)`,
    "--bg-agency": `url(${imageBase}/agency-image/agency-gradient-bg.jpg)`,
    "--bg-creative": `url(${imageBase}/creative-bg.jpg)`
  } satisfies Record<`--${string}`, string>;

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      style={cssVars as CSSProperties}
    >
      <body className={poppins.className}>
        {children}
        <GoTop />
      </body>
    </html>
  );
}
