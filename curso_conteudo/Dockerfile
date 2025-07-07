# Usa uma imagem base do Python
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta onde a aplicação Flask vai rodar
EXPOSE 5000

# Comando para rodar o app
CMD ["python", "run.py"]