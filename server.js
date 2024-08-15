require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "*"],
};

app.use(cors(corsOptions));
app.use(express.json());

let visitorCount = 0;
const adminToken = "bimaksAdminToken";

app.get("/api/visitor-count", (req, res) => {
  res.json({ count: visitorCount });
});

app.post("/api/increment-visitor-count", (req, res) => {
  const token = req.headers["authorization"];
  if (token !== `Bearer ${adminToken}`) {
    visitorCount += 1;
    console.log(`Visitor Count Updated: ${visitorCount}`);
    res.json({ count: visitorCount });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

app.post("/api/log-visit", (req, res) => {
  console.log(`Visit logged from IP: ${req.ip}`);
  res.status(200).send("Visit logged");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
