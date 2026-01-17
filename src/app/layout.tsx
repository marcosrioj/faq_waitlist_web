import "./globals.css";
import "@/styles/bootstrap.min.css";
import "@/styles/boxicons.min.css";
import "@/styles/flaticon.css";
import "@/styles/style.css";
import "@/styles/responsive.css";
import "@/styles/rtl.css";

import type { ReactNode } from "react";
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

  return (
    <html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"}>
      <body className={poppins.className}>
        {children}
        <GoTop />
      </body>
    </html>
  );
}
