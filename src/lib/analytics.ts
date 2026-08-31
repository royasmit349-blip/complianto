/**
 * GA4 via GTM — the client's existing container («GTM-ID» to be supplied)
 * reads the dataLayer. Events degrade silently when GTM is absent.
 */
export type AnalyticsEvent =
  | "consultation_submitted"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "service_viewed"
  | "name_check_used"
  | "calendar_downloaded";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params?: Record<string, string | number>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
