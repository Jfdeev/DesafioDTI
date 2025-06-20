import { jest } from '@jest/globals';

// Moquei os modulos para evitar dependências reais durante os testes (estava dando erro por conta do tipo de importação imutavel '*')
jest.unstable_mockModule('../src/repositories/productRepository.js', () => ({
  getProducts: jest.fn(),
  createProduct: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn()
}));

const repo = await import('../src/repositories/productRepository.js');
const service = await import('../src/services/productService.js');

describe('Product - createProduct', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deve criar um produto válido', () => {
    const produto = {
      nome: 'Chocolate',
      preco: 99.9,
      categoria: 'Comida',
      estoque: 10,
      data_vencimento: '2024-12-31'
    };

    repo.getProducts.mockReturnValue([]);
    repo.createProduct.mockReturnValue({ lastInsertRowid: 1 });

    const result = service.createProduct(produto);

    expect(repo.getProducts).toHaveBeenCalled();
    expect(repo.createProduct).toHaveBeenCalledWith(produto);
    expect(result).toEqual({ lastInsertRowid: 1 });
  });

  it('deve lançar erro se o nome estiver vazio', () => {
    const produto = {
      nome: '',
      preco: 50,
      categoria: 'Acessórios',
      estoque: 5
    };

    expect(() => service.createProduct(produto)).toThrow('Todos os campos são obrigatórios');
  });

  it('deve lançar erro se o produto já existir com o mesmo nome', () => {
    const produto = {
      nome: 'Mouse',
      preco: 120,
      categoria: 'Eletrônicos',
      estoque: 8
    };

    repo.getProducts.mockReturnValue([{ nome: 'Mouse' }]);

    expect(() => service.createProduct(produto)).toThrow('Produto já existe com o mesmo nome');
  });
});

describe('Product - getProducts', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deve retornar a lista de produtos quando houver produtos', () => {
    const produtosMock = [
      { id: 1, nome: 'Teclado', preco: 50, categoria: 'Periféricos', estoque: 20 }
    ];

    repo.getProducts.mockReturnValue(produtosMock);

    const result = service.getProducts();
    expect(result).toEqual(produtosMock);
  });

  it('deve lançar erro se o retorno não for um array', () => {
    repo.getProducts.mockReturnValue(null);
    expect(() => service.getProducts()).toThrow('Erro ao recuperar produtos');
  });

  it('deve lançar erro se nenhum produto for encontrado', () => {
    repo.getProducts.mockReturnValue([]);
    expect(() => service.getProducts()).toThrow('Nenhum produto encontrado');
  });
});

describe('Product - getProductById', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deve retornar o produto correspondente ao ID', () => {
    const produto = { id: 1, nome: 'Monitor', preco: 700, categoria: 'Vídeo', estoque: 5 };
    repo.getProductById.mockReturnValue(produto);

    const result = service.getProductById(1);
    expect(result).toEqual(produto);
  });

  it('deve lançar erro se o ID não for um número', () => {
    expect(() => service.getProductById('abc')).toThrow('ID deve ser um número');
  });

  it('deve lançar erro se o produto não existir', () => {
    repo.getProductById.mockReturnValue(undefined);
    expect(() => service.getProductById(99)).toThrow('Produto com ID 99 não encontrado');
  });
});

describe('Product - updateProduct', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deve atualizar o produto com sucesso', () => {
    const id = 1;
    const dados = { nome: 'Monitor 4K', preco: 999, categoria: 'Vídeo', estoque: 3 };

    repo.getProductById.mockReturnValue({ id, ...dados });
    repo.updateProduct.mockReturnValue({ changes: 1 });

    const result = service.updateProduct(id, dados);

    expect(repo.getProductById).toHaveBeenCalledWith(id);
    expect(repo.updateProduct).toHaveBeenCalledWith(id, dados);
    expect(result).toEqual({ changes: 1 });
  });

  it('deve lançar erro se ID não for número', () => {
    expect(() => service.updateProduct('abc', {})).toThrow('ID deve ser um número');
  });

  it('deve lançar erro se produto não existir', () => {
    repo.getProductById.mockReturnValue(undefined);
    expect(() => service.updateProduct(999, {})).toThrow('Produto com ID 999 não encontrado');
  });
});

describe('Product - deleteProduct', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deve deletar produto com sucesso', () => {
    const id = 2;
    repo.getProductById.mockReturnValue({ id, nome: 'Fone' });
    repo.deleteProduct.mockReturnValue({ changes: 1 });

    const result = service.deleteProduct(id);

    expect(repo.getProductById).toHaveBeenCalledWith(id);
    expect(repo.deleteProduct).toHaveBeenCalledWith(id);
    expect(result).toEqual({ changes: 1 });
  });

  it('deve lançar erro se ID for inválido', () => {
    expect(() => service.deleteProduct('abc')).toThrow('ID deve ser um número');
  });

  it('deve lançar erro se produto não existir', () => {
    repo.getProductById.mockReturnValue(undefined);
    expect(() => service.deleteProduct(404)).toThrow('Produto com ID 404 não encontrado');
  });
});
