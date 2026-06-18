import express from "express";
import cors from "cors";
import db, { addBookmark } from "./db.js";

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
  const bookmarks = db
    .prepare("SELECT * FROM bookmarks")
    .all();

  res.json(bookmarks);
});

app.post("/api/bookmarks", (req, res) => {
  const { title, url } = req.body;

  addBookmark(title, url);

  res.json({
    message: "Bookmark saved",
    title,
    url
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});