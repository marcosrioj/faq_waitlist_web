export const eventTypes = [
  "page_view",
  "language_detected",
  "language_changed",
  "cta_click",
  "pricing_view",
  "plan_click",
  "modal_open",
  "lead_submitted",
  "thank_you_view",
  "survey_submitted"
] as const;

export type EventType = (typeof eventTypes)[number];

export function isEventType(value: string): value is EventType {
  return eventTypes.includes(value as EventType);
}
