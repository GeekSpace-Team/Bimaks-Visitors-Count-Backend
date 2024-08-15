require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors("*"));
app.use(express.json());

let visitorCount = 0;
const adminToken = "bimaksAdminToken";

const checkAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === `Bearer ${adminToken}`) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

app.get("/api/visitor-count/:siteId", (req, res) => {
  res.json({ count: visitorCount });
});

app.post("/api/increment-visitor-count", (req, res) => {
  const token = req.headers["authorization"];
  if (token === `Bearer ${adminToken}`) {
    res.status(403).json({ message: "Forbidden" });
  } else {
    visitorCount += 1;
    res.json({ count: visitorCount });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
