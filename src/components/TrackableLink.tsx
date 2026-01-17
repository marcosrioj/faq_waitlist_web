"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { EventType } from "@/lib/event-types";
import { trackEvent } from "@/lib/track";

type TrackableLinkProps = {
  href: string;
  locale: string;
  event: EventType;
  metadata?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

export default function TrackableLink({
  href,
  locale,
  event,
  metadata,
  className,
  children
}: TrackableLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, locale, metadata)}
    >
      {children}
    </Link>
  );
}
