// server/index.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Node 18+ can use global fetch, otherwise npm i node-fetch

const app = express();
app.use(cors());
app.use(express.json());

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8pMXKyvw0OdRuRtJCh3nyvsjYLYpGcpE4_fQs9mnhUGZB7RCDzjxqf9dbWh3ktBgKdA/exec";

app.post("/ticket", async (req, res) => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Apps Script response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Invalid JSON from Apps Script", raw: text });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
