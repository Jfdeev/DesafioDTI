import { db } from "../db.js";

function createProduct(product) {
    const { nome, preco, categoria, estoque, data_vencimento } = product;
  
    const stmt = db.prepare(`
      INSERT INTO produtos (nome, preco, categoria, estoque, data_vencimento)
      VALUES (?, ?, ?, ?, ?)
    `);
  
    return stmt.run(nome, preco, categoria, estoque, data_vencimento || null);
  }

function getProducts() {
  const stmt = db.prepare('SELECT * FROM produtos');
  return stmt.all();
}

function getProductById(id) {
    const stmt = db.prepare('SELECT * FROM produtos WHERE id = ?');
    return stmt.get(id);
}

function updateProduct(id, product) {
    const { nome, preco, categoria, estoque } = product;
    const stmt = db.prepare('UPDATE produtos SET nome = ?, preco = ?, categoria = ?, estoque = ? WHERE id = ?');
    return stmt.run(nome, preco, categoria, estoque, id);
}

function deleteProduct(id) {
    const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
    return stmt.run(id);
}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}