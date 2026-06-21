import Database from "better-sqlite3";

const db = new Database("bookmarks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
  )
`);

export function addBookmark(title, url) {
  return db
    .prepare(`
      INSERT INTO bookmarks (title, url)
      VALUES (?, ?)
    `)
    .run(title, url);
}

export function deleteBookmark(id) {
  return db
    .prepare("DELETE FROM bookmarks WHERE id = ?")
    .run(id);
}

export function searchBookmarks(query) {
  return db
    .prepare(`
      SELECT * FROM bookmarks
      WHERE title LIKE ?
    `)
    .all(`%${query}%`);
}

export function getStats() {
  return db
    .prepare("SELECT COUNT(*) as totalBookmarks FROM bookmarks")
    .get();
}

export default db;