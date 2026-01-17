export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeText(input: unknown, maxLength = 160): string | null {
  if (typeof input !== "string") {
    return null;
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

export function sanitizeUrl(input: unknown, maxLength = 200): string | null {
  const value = sanitizeText(input, maxLength);
  if (!value) {
    return null;
  }
  return value;
}
