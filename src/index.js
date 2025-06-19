import readline from 'readline-sync';
import * as service from './services/productService.js';

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
            if (choice === '1') {
                const nome = readline.question('Nome do Produto: ');
                const preco = parseFloat(readline.question('Preço do Produto: '));
                const categoria = readline.question('Categoria do Produto: ');
                const estoque = parseInt(readline.question('Quantidade em Estoque: '));
                const data_vencimento = readline.question('Data de Vencimento YYYY-MM-DD (Opcional): ');

                service.createProduct({ nome, preco, categoria, estoque, data_vencimento });
                console.log(`Produto "${nome}" criado com sucesso!`);
            }

            else if (choice === '2') {
                const products = service.getProducts();
                console.log('Lista de Produtos:');
                products.forEach(product => {
                    console.log(`ID: ${product.id}, Nome: ${product.nome}, Preço: ${product.preco}, Categoria: ${product.categoria}, Estoque: ${product.estoque} ${product.data_vencimento ? `, Data de Vencimento: ${product.data_vencimento}` : ''}`);
                });
            }

            else if (choice === '3') {
                const id = parseInt(readline.question('ID do Produto: '));
                const product = service.getProductById(id);
                console.log(`ID: ${product.id}, Nome: ${product.nome}, Preço: ${product.preco}, Categoria: ${product.categoria}, Estoque: ${product.estoque} ${product.data_vencimento ? `, Data de Vencimento: ${product.data_vencimento}` : ''}`);
            }

            else if (choice === '4') {
                const id = parseInt(readline.question('ID do produto: '));
                const nome = readline.question('Novo Nome do Produto: ');
                const preco = parseFloat(readline.question('Novo Preço do Produto: '));
                const categoria = readline.question('Nova Categoria do Produto: ');
                const estoque = parseInt(readline.question('Nova Quantidade em Estoque: '));
                const data_vencimento = readline.question('Nova Data de Vencimento YYYY-MM-DD (Opcional): ');

                service.updateProduct(id, { nome, preco, categoria, estoque, data_vencimento });
                console.log(`Produto com ID ${id} atualizado com sucesso!`);
            }

            else if (choice === '5') {
                const id = parseInt(readline.question('ID do produto a ser deletado: '));
                service.deleteProduct(id);
                console.log(`Produto com ID ${id} deletado com sucesso!`);
            }

            else if (choice === '6') {
                console.log('Saindo do sistema...');
                break;
            }

            else {
                console.log('Opção inválida. Tente novamente.');
            }

        } catch (error) {
            console.log(`Erro: ${error.message}`);
        }
    }
}

main();
