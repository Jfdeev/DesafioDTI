import * as repo from '../repositories/productRepository.js';
import { logger } from '../logger.js';

function createProduct(product) {
    const { nome, preco, categoria, estoque, data_vencimento } = product;

    try {
        if (!nome || !preco || !categoria || estoque === undefined) {
            throw new Error('Todos os campos são obrigatórios');
        }
        if (typeof preco !== 'number' || preco < 0) {
            throw new Error('Preço deve ser um número positivo');
        }
        if (typeof estoque !== 'number' || estoque < 0) {
            throw new Error('Estoque deve ser um número não negativo');
        }
        if (data_vencimento && isNaN(Date.parse(data_vencimento))) {
            throw new Error('Data de vencimento deve ser uma data válida no formato YYYY-MM-DD');
        }
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error('Nome deve ser uma string não vazia');
        }
        if (typeof categoria !== 'string' || categoria.trim() === '') {
            throw new Error('Categoria não pode ser vazia');
        }

        const existingProduct = repo.getProducts().find(p => p.nome === nome);
        if (existingProduct) {
            throw new Error('Produto já existe com o mesmo nome');
        }

        const result = repo.createProduct(product);
        logger.info(`Produto "${nome}" criado com sucesso.`);
        return result;
    } catch (error) {
        logger.error(`Erro ao criar produto: ${error.message}`);
        throw error;
    }
}

function getProducts() {
    try {
        const products = repo.getProducts();
        if (!Array.isArray(products)) {
            throw new Error('Erro ao recuperar produtos');
        }
        if (products.length === 0) {
            throw new Error('Nenhum produto encontrado');
        }
        logger.info(`Listagem de ${products.length} produto(s) realizada com sucesso.`);
        return products;
    } catch (error) {
        logger.error(`Erro ao listar produtos: ${error.message}`);
        throw error;
    }
}

function getProductById(id) {
    try {
        if (isNaN(id)) {
            throw new Error('ID deve ser um número');
        }
        const product = repo.getProductById(id);
        if (!product) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }
        logger.info(`Produto com ID ${id} buscado com sucesso.`);
        return product;
    } catch (error) {
        logger.error(`Erro ao buscar produto por ID: ${error.message}`);
        throw error;
    }
}

function updateProduct(id, product) {
    try {
        if (isNaN(id)) {
            throw new Error('ID deve ser um número');
        }
        const existingProduct = repo.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        const result = repo.updateProduct(id, product);
        logger.info(`Produto com ID ${id} atualizado com sucesso.`);
        return result;
    } catch (error) {
        logger.error(`Erro ao atualizar produto: ${error.message}`);
        throw error;
    }
}

function deleteProduct(id) {
    try {
        if (isNaN(id)) {
            throw new Error('ID deve ser um número');
        }
        const existingProduct = repo.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }

        const result = repo.deleteProduct(id);
        logger.info(`Produto com ID ${id} deletado com sucesso.`);
        return result;
    } catch (error) {
        logger.error(`Erro ao deletar produto: ${error.message}`);
        throw error;
    }
}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
