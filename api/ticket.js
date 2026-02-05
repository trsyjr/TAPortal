// pages/api/ticket.js
import fetch from "node-fetch";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8pMXKyvw0OdRuRtJCh3nyvsjYLYpGcpE4_fQs9mnhUGZB7RCDzjxqf9dbWh3ktBgKdA/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const gsRes = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await gsRes.text();
    console.log("Apps Script RAW response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        success: false,
        error: "Invalid JSON from Apps Script",
        raw: text,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
