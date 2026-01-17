"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";
import { deleteCookie, getCookie } from "@/lib/client-cookies";
import { LANG_DETECTED_COOKIE } from "@/lib/constants";

type EventTrackerProps = {
  locale: string;
};

export default function EventTracker({ locale }: EventTrackerProps) {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) {
      return;
    }
    lastPath.current = pathname;
    trackEvent("page_view", locale, {
      path: pathname,
      referrer: document.referrer || undefined
    });

    const detected = getCookie(LANG_DETECTED_COOKIE);
    if (detected) {
      trackEvent("language_detected", locale, { detected });
      deleteCookie(LANG_DETECTED_COOKIE);
    }
  }, [locale, pathname]);

  return null;
}
