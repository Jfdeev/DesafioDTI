import Database from "better-sqlite3";

export const db = new Database('database.db')


db.exec(`
        CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria TEXT NOT NULL,
        estoque INTEGER NOT NULL DEFAULT 0,
        data_vencimento DATE
    );
  `);