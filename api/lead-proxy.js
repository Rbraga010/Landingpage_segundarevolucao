export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();
  try {
    // Enviar para War Room PulsarH com tag de origem
    const payload = {
      ...req.body,
      origem: "Imersao.AI"
    };
    
    const response = await fetch("http://72.60.6.61:3000/api/webhooks/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer PulsarH_Lead_Capture_2026"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
