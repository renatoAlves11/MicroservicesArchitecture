from flask import Flask, request, jsonify
import bcrypt
import jwt
import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'chave-padrao-insegura') #mantem a chave de segurança fora do código-fonte

# Banco de usuários fake
users = {
    "joao": bcrypt.hashpw("12345".encode('utf-8'), bcrypt.gensalt()),
    "maria": bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt())
}

@app.route('/', methods=['GET'])
def home():
    return "Microserviço de autenticação rodando!"

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    #verifica se username e password existem e são strings
    if not username or not isinstance(username, str):
        return jsonify({"error": "Campo 'username' é obrigatório e deve ser texto"}), 400
    if not password or not isinstance(password, str):
        return jsonify({"error": "Campo 'password' é obrigatório e deve ser texto"}), 400

    hash_stored = users.get(username)

    if hash_stored and bcrypt.checkpw(password.encode('utf-8'), hash_stored):  #verifica valor de senha aplicando a função hash
        token = jwt.encode({
            'sub': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"token": token})

    return jsonify({"error": "Credenciais inválidas"}), 401


@app.route('/verify', methods=['POST'])
def verify():
    token = request.json.get('token')
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({"valid": True, "user": decoded['sub']})
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "error": "Token inválido"}), 401
