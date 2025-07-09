import bcrypt
import jwt
import datetime
import requests
import os
from flask import current_app, jsonify

def get_database_service_url():
    return os.environ.get('DATABASE_SERVICE_URL', 'http://localhost:8004')

def auth_user(email: str, password: str):
    try:
        response = requests.get(f"{get_database_service_url()}/usuarios")
        if response.status_code == 200:
            usuarios = response.json()
            for usuario in usuarios:
                if usuario['email'] == email and bcrypt.checkpw(password.encode(), usuario['password'].encode()):
                    return usuario
    except requests.RequestException as e:
        print(f"Erro ao conectar com serviço de banco: {e}")
    return None

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    if not email or not isinstance(email, str):
        return jsonify({"error": "Campo 'email' é obrigatório e deve ser texto"}), 400
    if not password or not isinstance(password, str):
        return jsonify({"error": "Campo 'password' é obrigatório e deve ser texto"}), 400
    
    user = auth_user(email, password)

    if user:
        token = jwt.encode({
            'sub': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"token": token}), 200

    return jsonify({"error": "Credenciais inválidas"}), 401

def verify_token(token):
    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({"valid": True, "user": decoded['sub']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "error": "Token inválido"}), 401

def register_user(data):
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not isinstance(name, str):
        return jsonify({"error": "Campo 'name' é obrigatório e deve ser texto"}), 400
    if not email or not isinstance(email, str):
        return jsonify({"error": "Campo 'email' é obrigatório e deve ser texto"}), 400
    if not password or not isinstance(password, str):
        return jsonify({"error": "Campo 'password' é obrigatório e deve ser texto"}), 400

    # Verificar se email já existe
    try:
        response = requests.get(f"{get_database_service_url()}/usuarios")
        if response.status_code == 200:
            usuarios = response.json()
            for usuario in usuarios:
                if usuario['email'] == email:
                    return jsonify({"error": "Email já cadastrado"}), 409
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    
    # Criar usuário no serviço de banco
    try:
        response = requests.post(f"{get_database_service_url()}/usuarios", json={
            'name': name,
            'email': email,
            'password': hashed_pw
        })
        if response.status_code == 201:
            novo_usuario = response.json()
            return jsonify({"message": "Usuário registrado com sucesso", "id": novo_usuario['id']}), 201
        else:
            return jsonify({"error": "Erro ao criar usuário"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500
