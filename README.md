# TypeScript Simple API

Uma API REST simples construída com TypeScript e MySQL. Esta API fornece operações CRUD para gerenciar usuários.

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Execução](#execução)
- [Rotas da API](#rotas-da-api)
- [Postman Collection](#collection-do-postman)
- [Licença](#licença)

## Descrição

Esta aplicação é um exemplo de API REST desenvolvida com TypeScript utilizando Express.js e MySQL como banco de dados relacional. A API permite criar, ler, atualizar e deletar usuários.

## Instalação

Para clonar o repositório e instalar as dependências, execute os seguintes comandos:

```bash
git clone https://github.com/dhDSouza/typescript-simple-api.git
cd typescript-simple-api
npm install
```

## Configuração do Banco de Dados

Crie um banco de dados MySQL e configure um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```

Certifique-se de que o banco de dados MySQL esteja rodando corretamente e crie uma tabela de usuários com a seguinte estrutura SQL:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

## Execução

Para rodar a aplicação localmente, use o seguinte comando:

```bash
npm start
```

Isso iniciará o servidor na porta definida no arquivo `.env` (padrão 3000).

## Rotas da API

A seguir estão as rotas disponíveis na API e suas funcionalidades:

### Criar um Usuário

- **Endpoint**: `/api/users`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário.
- **Body**:

  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@teste.com"
  }
  ```

- **Resposta de Sucesso**: `201 Created`
- **Exemplo de Resposta**:

  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "email@teste.com"
  }
  ```

### Buscar Todos os Usuários

- **Endpoint**: `/api/users`
- **Método**: `GET`
- **Descrição**: Retorna todos os usuários cadastrados.
- **Resposta de Sucesso**: `200 OK`
- **Resposta de Falha**: `404 Not Found`
- **Exemplo de Resposta**:

  ```json
  [
    {
      "id": 1,
      "name": "Nome do Usuário",
      "email": "email@teste.com"
    }
  ]
  ```

### Buscar Usuário por ID

- **Endpoint**: `/api/users/:id`
- **Método**: `GET`
- **Descrição**: Retorna um usuário específico com base no ID fornecido.
- **Resposta de Sucesso**: `200 OK`
- **Resposta de Falha**: `404 Not Found`
- **Exemplo de Resposta**:

  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "email@teste.com"
  }
  ```

### Atualizar um Usuário por ID

- **Endpoint**: `/api/users/:id`
- **Método**: `PUT`
- **Descrição**: Atualiza as informações de um usuário específico.
- **Body**:

  ```json
  {
    "name": "Novo Nome",
    "email": "novoemail@teste.com"
  }
  ```

- **Resposta de Sucesso**: `200 OK`
- **Resposta de Falha**: `404 Not Found`

### Deletar um Usuário por ID

- **Endpoint**: `/api/users/:id`
- **Método**: `DELETE`
- **Descrição**: Deleta um usuário específico com base no ID fornecido.
- **Resposta de Sucesso**: `204 No Content`
- **Resposta de Falha**: `404 Not Found`

## Collection do Postman

Para facilitar o teste da API, uma collection do Postman está disponível na pasta collections do projeto. Esta collection inclui exemplos de requisições para todos os endpoints da API.

### Importando a Collection no Postman

1. Localize a pasta collections na raiz do projeto.
2. Encontre o arquivo `postman-collection.json`.
3. Abra o Postman.
4. Clique em "Import" no menu superior.
5. Selecione a aba "File" e arraste o arquivo `postman-collection.json` para a área de importação ou use o botão "Upload Files" para selecionar o arquivo manualmente.
6. Clique em "Import" para adicionar a collection ao Postman.

### Variáveis de Ambiente

A collection inclui variáveis de ambiente predefinidas:

- `baseUrl`: A URL base da sua API (por padrão, configurada como `http://localhost:3000/api`).
- `userId`: Um ID de usuário para testes (pode ser atualizado conforme necessário).

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
