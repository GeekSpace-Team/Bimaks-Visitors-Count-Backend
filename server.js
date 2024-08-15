require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());

const adminToken = "bimaksAdminToken";

app.get("/api/visitor-count", (req, res) => {
  const visitorCount = fs.readFileSync("./count.txt", { encoding: "utf8" });
  console.log(visitorCount);
  res.json({ count: visitorCount });
});

app.post("/api/increment-visitor-count", async (req, res) => {
  const file = fs.readFileSync("./count.txt", { encoding: "utf8" });
  const newCount = Number(file) + 1;
  fs.writeFileSync("./count.txt", newCount.toString(), { encoding: "utf8" });
  const token = req.headers["authorization"];
  if (token !== `Bearer ${adminToken}`) {
    console.log(`Visitor Count Updated: ${newCount}`);
    res.json({ count: newCount });
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
