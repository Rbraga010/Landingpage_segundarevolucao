/**
 * API proxy que encaminha form submissions da LP pro War Room PulsarH.
 * Captura nome/email/phone/UTM params + dispara evento "Lead" no Meta CAPI.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      name, email, phone, role, income, challenge, lp_origin,
      utm_source, utm_medium, utm_campaign, utm_content,
      src, fbclid, gclid,
    } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: "email required" });
    }

    const payload = {
      name,
      email,
      phone,
      role,
      income,
      challenge,
      lp_origin: lp_origin || "IMERSAO",
      origem: "Imersao.AI",
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      src,
      fbclid,
      gclid,
    };

    // Envia pro War Room em producao (Vercel) — mais confiavel que VPS:3000
    const WAR_ROOM_URL = process.env.WAR_ROOM_URL || "https://sala-de-guerra-pulsar-h.vercel.app";
    const LEADS_TOKEN = process.env.LEADS_WEBHOOK_TOKEN || "PulsarH_Lead_Capture_2026";

    const response = await fetch(`${WAR_ROOM_URL}/api/webhooks/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LEADS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Dispara evento "Lead" server-side no Meta via War Room /api/meta/pixel/track
    // (complementa o pixel client-side — mais confiavel, ad-blockers nao bloqueiam)
    const PIXEL_TOKEN = process.env.PIXEL_TRACK_TOKEN;
    if (PIXEL_TOKEN) {
      try {
        await fetch(`${WAR_ROOM_URL}/api/meta/pixel/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${PIXEL_TOKEN}`,
          },
          body: JSON.stringify({
            event: "Lead",
            input: {
              email,
              phone,
              firstName: name ? String(name).split(" ")[0] : undefined,
              lastName: name ? String(name).split(" ").slice(1).join(" ") : undefined,
              utmSource: utm_source,
              utmMedium: utm_medium,
              utmCampaign: utm_campaign,
              utmContent: utm_content,
              eventSourceUrl: req.headers.referer || req.headers.origin,
              clientIp: req.headers["x-forwarded-for"]?.split(",")[0]?.trim(),
              userAgent: req.headers["user-agent"],
            },
          }),
        });
      } catch (pxErr) {
        console.warn("CAPI Lead fail:", pxErr?.message || pxErr);
      }
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
