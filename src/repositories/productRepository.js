import { db } from "../db.js";

export function createProduct(product) {
  const { nome, preco, categoria, estoque } = product;
  const stmt = db.prepare('INSERT INTO produtos (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)');
  return stmt.run(nome, preco, categoria, estoque);
}

export function getProducts() {
  const stmt = db.prepare('SELECT * FROM produtos');
  return stmt.all();
}

export function getProductById(id) {
    const stmt = db.prepare('SELECT * FROM produtos WHERE id = ?');
    return stmt.get(id);
}

export function updateProduct(id, product) {
    const { nome, preco, categoria, estoque } = product;
    const stmt = db.prepare('UPDATE produtos SET nome = ?, preco = ?, categoria = ?, estoque = ? WHERE id = ?');
    return stmt.run(nome, preco, categoria, estoque, id);
}

export function deleteProduct(id) {
    const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
    return stmt.run(id);
}