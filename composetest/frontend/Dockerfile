# Dockerfile (frontend/)
FROM python:3.10-slim

WORKDIR /app
COPY . .

# Instalar dependências
RUN pip install -r requirements.txt

# Expõe a porta do Flask
EXPOSE 5000

# Rodar a aplicação
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]