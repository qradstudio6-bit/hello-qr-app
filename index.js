const express = require("express");
const app = express();

/**
 * TEMP in-memory store
 * (later DB वापरू – Mongo / Postgres)
 */
const qrMap = {
  abc123: {
    redirectTo: "https://google.com",
    scans: 0,
  },
  demo456: {
    redirectTo: "https://example.com",
    scans: 0,
  },
};

// Home
app.get("/", (req, res) => {
  res.send("🚀 QR Ad Studio is LIVE!");
});

// QR Redirect Route
app.get("/r/:code", (req, res) => {
  const code = req.params.code;
  const qr = qrMap[code];

  if (!qr) {
    return res.status(404).send("❌ Invalid QR Code");
  }

  // Scan count increase
  qr.scans += 1;

  console.log(`QR ${code} scanned ${qr.scans} times`);

  // Redirect
  res.redirect(qr.redirectTo);
});

// Debug / Analytics (for now)
app.get("/stats", (req, res) => {
  res.json(qrMap);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
