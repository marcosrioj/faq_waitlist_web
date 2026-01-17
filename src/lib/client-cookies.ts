"use client";

export function getCookie(name: string): string | null {
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    const [key, ...rest] = part.split("=");
    if (key === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

type CookieOptions = {
  maxAge?: number;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
};

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const path = options.path ?? "/";
  const sameSite = options.sameSite ?? "lax";
  const maxAge = options.maxAge ? `; max-age=${options.maxAge}` : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${path}; samesite=${sameSite}${maxAge}`;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`;
}
