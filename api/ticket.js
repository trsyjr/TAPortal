// /pages/api/ticket.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    // Apps Script URL
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwsZg3doNPMN7jWR-q6dpM15x829H6OD9zAwOUdrJCPO9W8jwqQlNjW2QP0Jh80qjBgTg/exec";

    // Use global fetch
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Apps Script RAW response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ success: false, error: "Invalid JSON from Apps Script", raw: text });
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
