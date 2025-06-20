# 📘 Documentação da Aplicação - Sistema de Gerenciamento de Produtos

## 🛠️ Descrição Geral

Esta aplicação é um sistema de **CRUD de produtos** executado no terminal. Permite ao usuário **cadastrar**, **listar**, **buscar**, **atualizar** e **excluir** produtos de um banco de dados local (SQLite). A aplicação inclui **validações** e **logs automáticos** com `winston`.

---

## 📦 Recurso escolhido: **Produto**

### ✅ Atributos e suas propriedades

| Campo             | Tipo                  | Obrigatório | Observações                                   |
| ----------------- | --------------------- | ----------- | --------------------------------------------- |
| `nome`            | `string`              | ✅ Sim       | Não pode ser vazio e deve ser único           |
| `preco`           | `number`              | ✅ Sim       | Deve ser maior ou igual a 0                   |
| `categoria`       | `string`              | ✅ Sim       | Não pode ser vazio                            |
| `estoque`         | `number` (inteiro)    | ✅ Sim       | Deve ser um número inteiro maior ou igual a 0 |
| `data_vencimento` | `string` (YYYY-MM-DD) | ❌ Não       | Se fornecida, deve ser uma data válida        |

---

## 📌 Linguagem e Tecnologias Utilizadas

* **Node.js**
* **SQLite3** com `better-sqlite3`
* **Winston** (para logging)
* **readline-sync** (interface no terminal)
* **Docker** (opcional)

---

## 📥 Instalação e Configuração

### ✅ Pré-requisitos

* Node.js (v18 ou superior)
* Git (opcional)
* Docker (opcional)

### 🔧 Passos para executar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/nome-repo.git
cd nome-repo

# 2. Instale as dependências
npm install

# 3. (Opcional) Exclua o banco de dados existente
rm database.db

# 4. Inicie a aplicação
npm start
```

### 🐳 Execução via Docker

```bash
# Build da imagem
docker build -t crud-console-app .

# Execute o contêiner
docker run -it crud-console-app
```

---

## 🚀 Como Usar a Aplicação

A aplicação roda em modo interativo no terminal, oferecendo as seguintes opções:

### 1. Criar Produto

**Exemplo de entrada:**

```
Nome do Produto: Chocolate
Preço do Produto: 5.99
Categoria do Produto: Alimentos
Quantidade em Estoque: 50
Data de Vencimento (opcional): 2025-12-31
```

### 2. Listar Produtos

Exibe todos os produtos cadastrados.

### 3. Buscar Produto por ID

```
ID do Produto: 1
```

### 4. Atualizar Produto

```
ID do Produto: 1
Novo Nome do Produto: Chocolate Amargo
Novo Preço: 6.99
Nova Categoria: Alimentos
Nova Quantidade em Estoque: 30
```

### 5. Deletar Produto

```
ID do produto a ser deletado: 1
```

### 6. Sair

Encerra a aplicação com mensagem de despedida.

---

## 📄 Logs da Aplicação

Os logs são gerados automaticamente e salvos em:

```bash
logs/app.log
```

**Tipos de log gerados:**

* Criação, atualização e exclusão de produtos
* Erros de entrada e validação
* Execuções inválidas

