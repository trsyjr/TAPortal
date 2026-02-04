import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const gsRes = await fetch("https://script.google.com/macros/s/AKfycby8pMXKyvw0OdRuRtJCh3nyvsjYLYpGcpE4_fQs9mnhUGZB7RCDzjxqf9dbWh3ktBgKdA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await gsRes.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: false, error: "Invalid response from Apps Script" };
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
