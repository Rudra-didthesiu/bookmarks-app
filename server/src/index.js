import express from "express";
import cors from "cors";
import db, { addBookmark, deleteBookmark, searchBookmarks, getStats } from "./db.js";

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

//add bookmark
app.post("/api/bookmarks", (req, res) => {
  const { title, url, category } = req.body;
  const created_at = new Date().toISOString();
   if (!title || !url || !category) {
    return res.status(400).json({
      message: "Title, URL, and Category are required"
    });
  }

  if (title.length < 3) {
  return res.status(400).json({
    message: "Title must be at least 3 characters long"
  });
}

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
  return res.status(400).json({
    message: "URL must start with http:// or https://"
  });
}

  addBookmark(title, url, category, created_at);

  res.json({
    message: "Bookmark saved",
    title,
    url,
    category,
    created_at
  });
});

//delete bookmark
app.delete("/api/bookmarks/:id", (req, res) => {
  const { id } = req.params;

  deleteBookmark(id);

  res.json({
    message: "Bookmark deleted"
  });
});

//
app.get("/api/bookmarks/search", (req, res) => {
  const { q } = req.query;

  const bookmarks = searchBookmarks(q);

  res.json(bookmarks);
});

app.get("/api/stats", (req, res) => {
  const stats = getStats();

  res.json(stats);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});