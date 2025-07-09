# Frontend - Microsserviços

Este é o frontend para a arquitetura de microsserviços. Ele consome as APIs dos serviços de autenticação, cursos, conteúdos e pagamentos.

## Scripts

- `npm run dev` - Inicia o servidor Next.js em modo desenvolvimento (porta 3000)
- `npm run build` - Gera o build de produção
- `npm start` - Inicia o servidor em modo produção

## Docker

O frontend é executado na porta 8010 (exposta pelo Docker). Para rodar junto com os outros serviços:

```bash
docker-compose up --build
```

## Variáveis de Ambiente

- `NEXT_PUBLIC_AUTH_URL` - URL do serviço de autenticação
- `NEXT_PUBLIC_CURSO_URL` - URL do serviço de cursos/conteúdos
- `NEXT_PUBLIC_PAGAMENTO_URL` - URL do serviço de pagamentos
- `NEXT_PUBLIC_DATABASE_URL` - URL do serviço de banco de dados

Essas variáveis são configuradas automaticamente pelo Docker Compose. 