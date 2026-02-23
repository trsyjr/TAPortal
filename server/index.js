// const express = require("express");
// const cors = require("cors");
// const app = express();
// const PORT = 5000;

// app.use(cors());

// const events = [
//   { id: 1, title: "React Training", date: "2026-02-25", description: "Full-day React training" },
//   { id: 2, title: "Tailwind Workshop", date: "2026-02-28", description: "Hands-on Tailwind CSS workshop" },
//   { id: 3, title: "Node.js Bootcamp", date: "2026-03-05", description: "Backend development with Node.js" },
// ];

// app.get("/events/:year/:month", (req, res) => {
//   const { year, month } = req.params;
//   const filtered = events.filter(
//     e => new Date(e.date).getFullYear() === parseInt(year) &&
//          new Date(e.date).getMonth() + 1 === parseInt(month)
//   );
//   res.json(filtered);
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));