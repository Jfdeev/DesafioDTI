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
            
        } catch (error) {
            logger.error(`Erro: ${error.message}`);
        }
    }
}

main();