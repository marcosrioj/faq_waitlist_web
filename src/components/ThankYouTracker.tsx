"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";

type ThankYouTrackerProps = {
  locale: string;
};

export default function ThankYouTracker({ locale }: ThankYouTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("thank_you_view", locale, { path: pathname ?? "" });
  }, [locale, pathname]);

  return null;
}
