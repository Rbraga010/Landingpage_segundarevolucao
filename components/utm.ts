/**
 * UTM capture + Meta Pixel helpers.
 * Captura UTM params da URL no primeiro PageView, guarda em sessionStorage,
 * e fornece helpers pra disparar eventos Meta com UTM attribution.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "fbclid", "gclid"] as const;
const STORAGE_KEY = "pulsarh_utm";

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  src?: string;
  fbclid?: string;
  gclid?: string;
  landedAt?: string;
};

/**
 * Captura UTM params da URL atual e guarda em sessionStorage.
 * Roda 1x quando a LP carrega. Idempotente — se UTMs já foram capturados,
 * preserva os originais (atribuição first-click).
 */
export function captureUtm(): UtmData {
  if (typeof window === "undefined") return {};

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing) as UtmData;
      if (parsed.utm_source || parsed.utm_campaign) return parsed; // preserva primeiro
    }

    const params = new URLSearchParams(window.location.search);
    const data: UtmData = { landedAt: new Date().toISOString() };
    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) (data as Record<string, string>)[key] = v;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch {
    return {};
  }
}

/**
 * Lê UTM guardados (ou captura se ainda não foi).
 */
export function getUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return JSON.parse(existing) as UtmData;
  } catch {}
  return captureUtm();
}

/**
 * Anexa UTM params a uma URL (pra passar pro checkout Hotmart).
 * Preserva params já existentes na URL.
 */
export function appendUtmToUrl(url: string): string {
  const utm = getUtm();
  try {
    const u = new URL(url);
    for (const [key, value] of Object.entries(utm)) {
      if (key === "landedAt") continue;
      if (value && !u.searchParams.has(key)) {
        u.searchParams.set(key, String(value));
      }
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Dispara evento Meta Pixel client-side (fbq).
 * Safe se fbq não carregou (ad blocker, script falhou).
 */
export function trackPixel(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    if (window.fbq) {
      if (data) window.fbq("track", event, data);
      else window.fbq("track", event);
    }
  } catch {
    // Silent — não quebra UX se pixel falhar
  }
}

/**
 * Dispara evento "Lead" (submit do form) com dados do usuário + UTM.
 */
export function trackLead(email: string, phone?: string): void {
  const utm = getUtm();
  trackPixel("Lead", {
    content_name: "Imersao H.AI - Gestor da Era da IA",
    content_category: "Imersao",
    ...utm,
  });
  // Pixel server-side complementar via /api/lead-proxy já dispara
}

/**
 * Dispara evento "InitiateCheckout" antes de redirecionar pro Hotmart.
 */
export function trackInitiateCheckout(value: number = 697): void {
  const utm = getUtm();
  trackPixel("InitiateCheckout", {
    value,
    currency: "BRL",
    content_name: "Imersao H.AI - Gestor da Era da IA",
    content_ids: ["M103870619B"],
    content_type: "product",
    ...utm,
  });
}

/**
 * Dispara evento "ViewContent" (quando usuário rola pra seção importante).
 */
export function trackViewContent(contentName: string): void {
  trackPixel("ViewContent", {
    content_name: contentName,
    content_category: "Workshop",
  });
}
