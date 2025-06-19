import readline from 'readline-sync';
import { logger } from './logger.js';
import * as repo from './repositories/productRepository.js';

function main() {
    while (true) {
        console.log('\nMenu Produtos:');
        console.log('1. Criar Produto');
        console.log('2. Listar Produtos');
        console.log('3. Buscar Produto por ID');
        console.log('4. Atualizar Produto');
        console.log('5. Deletar Produto');
        console.log('6. Sair');
        const choice = readline.question('Escolha uma opção: ');

        try {
            if(choice == '1'){
                const nome = readline.question('Nome do Produto: ');
                const preco = parseFloat(readline.question('Preço do Produto: '));
                const categoria = readline.question('Categoria do Produto: ');
                const estoque = parseInt(readline.question('Quantidade em Estoque: '));
                
                repo.createProduct({ nome, preco, categoria, estoque });
                logger.info(`Produto "${nome}" criado com sucesso!`);
            } else if (choice == '2') {
                const products = repo.getProducts();
                if (products.length === 0) {
                    console.log('Nenhum produto encontrado.');
                    logger.info('Nenhum produto encontrado.');
                } else {
                    console.log('Produtos:');
                    products.forEach(product => {
                        console.log(`ID: ${product.id}, Nome: ${product.nome}, Preço: ${product.preco}, Categoria: ${product.categoria}, Estoque: ${product.estoque}`);
                    });
                }
            } else if (choice == '3') {
                const id = parseInt(readline.question('ID do Produto: '));
                const product = repo.getProductById(id);
                if (product) {
                    console.log(`ID: ${product.id}, Nome: ${product.nome}, Preço: ${product.preco}, Categoria: ${product.categoria}, Estoque: ${product.estoque}`);
                } else {
                    console.log('Produto não encontrado.');
                    logger.info(`Produto com ID ${id} não encontrado.`);
                }
            } else if (choice == '4') {
                const id = parseInt(readline.question('ID do produto: '));
                const nome = readline.question('Novo Nome do Produto: ');
                const preco = parseFloat(readline.question('Novo Preço do Produto: '));
                const categoria = readline.question('Nova Categoria do Produto: ');
                const estoque = parseInt(readline.question('Nova Quantidade em Estoque: '));

                repo.updateProduct(id, { nome, preco, categoria, estoque });
                logger.info(`Produto com ID ${id} atualizado com sucesso!`);
            } else if (choice == '5') {
                const id = parseInt(readline.question('ID do produto a ser deletado: '));
                repo.deleteProduct(id);
                logger.info(`Produto com ID ${id} deletado com sucesso!`);
            } else if (choice == '6') {
                logger.info('Saindo do sistema...');
                console.log('Saindo do sistema...');
                break;
            } else {
                console.log('Opção inválida. Tente novamente.');
                logger.warn('Opção inválida selecionada.');
            }
        } catch (error) {
            logger.error(`Erro: ${error.message}`);
        }
    }
}

main();