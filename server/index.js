const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby8pMXKyvw0OdRuRtJCh3nyvsjYLYpGcpE4_fQs9mnhUGZB7RCDzjxqf9dbWh3ktBgKdA/exec";

app.post("/ticket", async (req, res) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text(); // get raw response
    console.log("Apps Script response:", text); // debug

    // Try parsing JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return res.status(500).json({ status: "error", message: "Invalid JSON from Apps Script", raw: text });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// server/index.js
const PORT = 5000; // or 5001 if you changed it
app.listen(PORT, () =>
  console.log(`Proxy server running on http://localhost:${PORT}`)
);

const scriptResponse = await fetch(APPS_SCRIPT_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(req.body),
});

const text = await scriptResponse.text();
console.log("Apps Script RAW response:", text);

let json;
try {
  json = JSON.parse(text);
} catch {
  return res.status(500).json({
    success: false,
    error: "Invalid JSON from Apps Script",
    raw: text,
  });
}

res.json(json);


