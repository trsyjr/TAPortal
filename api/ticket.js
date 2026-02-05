// pages/api/ticket.js
import fetch from "node-fetch";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwc4-rHN6MUt5SlmkASV5lOVZ5Uq67ghZczOB5sQndLtnfVw_dbI0TdUDwYQaI1gGBdTg/exec";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Send data to Google Apps Script
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
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return res.status(500).json({
        success: false,
        error: "Invalid response from Apps Script",
        raw: text,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
