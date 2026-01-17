"use client";

import type { EventType } from "@/lib/event-types";

export async function trackEvent(
  type: EventType,
  locale: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type, locale, metadata }),
      keepalive: true
    });
  } catch {
    // Ignore tracking errors.
  }
}
