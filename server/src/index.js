import express from "express";
import cors from "cors";
import db, { addBookmark, deleteBookmark, searchBookmarks } from "./db.js";

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
  const { title, url } = req.body;

  addBookmark(title, url);

  res.json({
    message: "Bookmark saved",
    title,
    url
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

//search bookmarks
app.get("/api/bookmarks/search", (req, res) => {
  const { q } = req.query;

  const bookmarks = searchBookmarks(q);

  res.json(bookmarks);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});