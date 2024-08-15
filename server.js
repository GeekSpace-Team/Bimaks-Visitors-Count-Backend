require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: "http://95.85.121.153:7757/", // The origin allowed to make requests
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

let visitorCount = 0;
const adminToken = "bimaksAdminToken";

// Route to get visitor count
app.get("/api/visitor-count", (req, res) => {
  res.json({ count: visitorCount });
});

// Route to increment visitor count
app.post("/api/increment-visitor-count", (req, res) => {
  const token = req.headers["authorization"];
  if (token !== `Bearer ${adminToken}`) {
    visitorCount += 1;
    console.log(`Visitor Count Updated: ${visitorCount}`); // Log to console
    res.json({ count: visitorCount });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Route to log each visit (optional)
app.post("/api/log-visit", (req, res) => {
  console.log(`Visit logged from IP: ${req.ip}`);
  res.status(200).send("Visit logged");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
