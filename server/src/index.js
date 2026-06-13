import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Bookmarks API is running!");
});

app.get("/api/bookmarks", (req, res) => {
  res.json([]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});