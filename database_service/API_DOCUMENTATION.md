# API Documentation - Database Service

## Base URL
`http://localhost:8004`

## Endpoints

### Health Check
- **GET** `/health`
- **Description**: Verifica se o serviço está funcionando
- **Response**: `{"status": "healthy", "service": "database_service"}`

## Usuários

### Listar Usuários
- **GET** `/usuarios`
- **Description**: Lista todos os usuários
- **Response**:
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com"
  }
]
```

### Obter Usuário
- **GET** `/usuarios/{id}`
- **Description**: Obtém um usuário específico
- **Response**:
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### Criar Usuário
- **POST** `/usuarios`
- **Description**: Cria um novo usuário
- **Body**:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha_hash"
}
```
- **Response**:
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### Atualizar Usuário
- **PUT** `/usuarios/{id}`
- **Description**: Atualiza um usuário existente
- **Body**:
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@example.com"
}
```

### Deletar Usuário
- **DELETE** `/usuarios/{id}`
- **Description**: Remove um usuário
- **Response**: `{"message": "Usuário deletado com sucesso"}`

## Cursos

### Listar Cursos
- **GET** `/cursos`
- **Description**: Lista todos os cursos
- **Response**:
```json
[
  {
    "id": 1,
    "titulo": "Curso de Python",
    "descricao": "Aprenda Python do zero",
    "preco": 99.99
  }
]
```

### Obter Curso
- **GET** `/cursos/{id}`
- **Description**: Obtém um curso específico com seus conteúdos
- **Response**:
```json
{
  "id": 1,
  "titulo": "Curso de Python",
  "descricao": "Aprenda Python do zero",
  "preco": 99.99,
  "conteudos": [
    {
      "id": 1,
      "ordem": 1,
      "titulo": "Introdução ao Python",
      "texto": "Nesta aula vamos..."
    }
  ]
}
```

### Criar Curso
- **POST** `/cursos`
- **Description**: Cria um novo curso
- **Body**:
```json
{
  "titulo": "Curso de Python",
  "descricao": "Aprenda Python do zero",
  "preco": 99.99
}
```

### Atualizar Curso
- **PUT** `/cursos/{id}`
- **Description**: Atualiza um curso existente
- **Body**:
```json
{
  "titulo": "Curso de Python Atualizado",
  "descricao": "Nova descrição",
  "preco": 89.99
}
```

### Deletar Curso
- **DELETE** `/cursos/{id}`
- **Description**: Remove um curso
- **Response**: `{"message": "Curso deletado com sucesso"}`

## Conteúdos

### Listar Conteúdos
- **GET** `/conteudos`
- **Description**: Lista todos os conteúdos
- **Response**:
```json
[
  {
    "id": 1,
    "curso_id": 1,
    "titulo": "Introdução ao Python",
    "texto": "Nesta aula vamos...",
    "ordem": 1
  }
]
```

### Listar Conteúdos de um Curso
- **GET** `/conteudos/{curso_id}`
- **Description**: Lista todos os conteúdos de um curso específico
- **Response**:
```json
[
  {
    "id": 1,
    "titulo": "Introdução ao Python",
    "texto": "Nesta aula vamos...",
    "ordem": 1
  }
]
```

### Criar Conteúdo
- **POST** `/conteudos`
- **Description**: Cria um novo conteúdo
- **Body**:
```json
{
  "curso_id": 1,
  "titulo": "Introdução ao Python",
  "texto": "Nesta aula vamos aprender...",
  "ordem": 1
}
```

### Atualizar Conteúdo
- **PUT** `/conteudos/{id}`
- **Description**: Atualiza um conteúdo existente
- **Body**:
```json
{
  "titulo": "Introdução ao Python Atualizada",
  "texto": "Nova descrição da aula...",
  "ordem": 1
}
```

### Deletar Conteúdo
- **DELETE** `/conteudos/{id}`
- **Description**: Remove um conteúdo
- **Response**: `{"message": "Conteúdo deletado com sucesso"}`

## Pagamentos

### Listar Pagamentos
- **GET** `/pagamentos`
- **Description**: Lista todos os pagamentos
- **Response**:
```json
[
  {
    "id": "uuid-pagamento",
    "id_usuario": "1",
    "id_curso": "1",
    "valor": 99.99,
    "status": "pendente",
    "data": "2024-01-15T10:30:00"
  }
]
```

### Obter Pagamento
- **GET** `/pagamentos/{id_pagamento}`
- **Description**: Obtém um pagamento específico
- **Response**:
```json
{
  "id": "uuid-pagamento",
  "id_usuario": "1",
  "id_curso": "1",
  "valor": 99.99,
  "status": "pendente",
  "data": "2024-01-15T10:30:00"
}
```

### Criar Pagamento
- **POST** `/pagamentos`
- **Description**: Cria um novo pagamento
- **Body**:
```json
{
  "id_usuario": "1",
  "id_curso": "1",
  "valor": 99.99,
  "status": "pendente"
}
```

### Atualizar Pagamento
- **PUT** `/pagamentos/{id_pagamento}`
- **Description**: Atualiza um pagamento existente
- **Body**:
```json
{
  "status": "aprovado",
  "valor": 99.99
}
```

### Deletar Pagamento
- **DELETE** `/pagamentos/{id_pagamento}`
- **Description**: Remove um pagamento
- **Response**: `{"message": "Pagamento deletado com sucesso"}`

### Listar Pagamentos de um Usuário
- **GET** `/pagamentos/usuario/{id_usuario}`
- **Description**: Lista todos os pagamentos de um usuário específico
- **Response**:
```json
[
  {
    "id": "uuid-pagamento",
    "id_usuario": "1",
    "id_curso": "1",
    "valor": 99.99,
    "status": "pendente",
    "data": "2024-01-15T10:30:00"
  }
]
```

## Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Bad Request
- **404**: Não encontrado
- **409**: Conflito (ex: email já existe)
- **500**: Erro interno do servidor

## Exemplos de Uso

### Criar um usuário e um curso
```bash
# Criar usuário
curl -X POST http://localhost:8004/usuarios \
  -H "Content-Type: application/json" \
  -d '{"name": "João", "email": "joao@example.com", "password": "senha_hash"}'

# Criar curso
curl -X POST http://localhost:8004/cursos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Python Básico", "descricao": "Aprenda Python", "preco": 99.99}'
```

### Criar um pagamento
```bash
curl -X POST http://localhost:8004/pagamentos \
  -H "Content-Type: application/json" \
  -d '{"id_usuario": "1", "id_curso": "1", "valor": 99.99, "status": "pendente"}'
``` 