import crypto from "crypto";
import type { NextRequest } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const store = new Map<string, { count: number; resetAt: number }>();

function hashKey(ip: string): string {
  const secret = process.env.RATE_LIMIT_SECRET ?? "dev";
  return crypto.createHash("sha256").update(`${ip}:${secret}`).digest("hex");
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.ip ?? "unknown";
}

export function rateLimit(ip: string, limit = MAX_REQUESTS): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const key = hashKey(ip);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(key, entry);
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
