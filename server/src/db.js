import Database from "better-sqlite3";

const db = new Database("bookmarks.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL
  )
`);

export default db;