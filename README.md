# Arquitetura de Microsserviços com Serviço de Banco de Dados Centralizado

Este projeto implementa uma arquitetura de microsserviços onde todos os serviços fazem requisições para um serviço de banco de dados centralizado.

## Estrutura da Arquitetura

### Serviços

1. **database_service** (Porta 8004)
   - Serviço centralizado de banco de dados
   - Gerencia todas as operações CRUD para usuários, cursos, conteúdos e pagamentos
   - Usa PostgreSQL com SQLAlchemy
   - Expõe APIs REST para todos os outros serviços

2. **auth** (Porta 8000)
   - Serviço de autenticação
   - Gerencia login, registro e verificação de tokens
   - Faz requisições para o database_service para operações de usuário

3. **curso_conteudo** (Porta 8002)
   - Serviço de gerenciamento de cursos e conteúdos
   - Faz requisições para o database_service para operações de curso e conteúdo

4. **pagamento** (Porta 8003)
   - Serviço de pagamentos
   - Faz requisições para o database_service para operações de pagamento

5. **frontend** (Porta 8010)
   - Interface web em Next.js
   - Faz requisições para o database_service

6. **db** (PostgreSQL)
   - Banco de dados PostgreSQL
   - Acessado apenas pelo database_service

## Como Executar

1. **Subir todos os serviços:**
   ```bash
   docker-compose up --build
   ```

2. **Acessar os serviços:**
   - Frontend: http://localhost:8010
   - Auth Service: http://localhost:8000
   - Curso/Conteúdo Service: http://localhost:8002
   - Pagamento Service: http://localhost:8003
   - Database Service: http://localhost:8004

## APIs do Database Service

### Usuários
- `GET /usuarios` - Listar todos os usuários
- `GET /usuarios/{id}` - Obter usuário específico
- `POST /usuarios` - Criar novo usuário
- `PUT /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Deletar usuário

### Cursos
- `GET /cursos` - Listar todos os cursos
- `GET /cursos/{id}` - Obter curso específico com conteúdos
- `POST /cursos` - Criar novo curso
- `PUT /cursos/{id}` - Atualizar curso
- `DELETE /cursos/{id}` - Deletar curso

### Conteúdos
- `GET /conteudos` - Listar todos os conteúdos
- `GET /conteudos/{curso_id}` - Listar conteúdos de um curso
- `POST /conteudos` - Criar novo conteúdo
- `PUT /conteudos/{id}` - Atualizar conteúdo
- `DELETE /conteudos/{id}` - Deletar conteúdo

### Pagamentos
- `GET /pagamentos` - Listar todos os pagamentos
- `GET /pagamentos/{id}` - Obter pagamento específico
- `POST /pagamentos` - Criar novo pagamento
- `PUT /pagamentos/{id}` - Atualizar pagamento
- `DELETE /pagamentos/{id}` - Deletar pagamento
- `GET /pagamentos/usuario/{id_usuario}` - Listar pagamentos de um usuário

## Vantagens desta Arquitetura

1. **Centralização de Dados**: Todos os dados são gerenciados por um único serviço
2. **Consistência**: Não há duplicação de modelos de dados
3. **Simplicidade**: Os serviços não precisam gerenciar conexões de banco
4. **Escalabilidade**: O database_service pode ser escalado independentemente
5. **Manutenibilidade**: Mudanças no modelo de dados são feitas em um só lugar

## Comunicação entre Serviços

Todos os serviços se comunicam com o database_service via HTTP REST APIs. O database_service é o único que tem acesso direto ao banco de dados PostgreSQL.

## Tecnologias Utilizadas

- **Backend**: Flask, SQLAlchemy, PostgreSQL
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Containerização**: Docker, Docker Compose
- **Comunicação**: HTTP REST APIs 