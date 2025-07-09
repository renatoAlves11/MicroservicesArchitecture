# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Build de produção
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Copia apenas arquivos necessários do build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 5000

# Variável de ambiente para Next.js
ENV NODE_ENV=production
ENV PORT=5000

CMD ["npx", "next", "start", "-p", "5000"] 