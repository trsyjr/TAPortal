// // server/api/ticket.js
// import fetch from "node-fetch"; // Node 18+ has fetch built-in, optional

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, error: "Method not allowed" });
//   }

//   try {
//     // Send data to your Google Apps Script
//     const response = await fetch(
//       "https://script.google.com/macros/s/AKfycby8pMXKyvw0OdRuRtJCh3nyvsjYLYpGcpE4_fQs9mnhUGZB7RCDzjxqf9dbWh3ktBgKdA/exec",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(req.body),
//       }
//     );

//     const text = await response.text();
//     console.log("Apps Script RAW response:", text);

//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       return res.status(500).json({
//         success: false,
//         error: "Invalid JSON from Apps Script",
//         raw: text,
//       });
//     }

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
