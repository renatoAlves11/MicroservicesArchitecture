import bcrypt
import jwt
import datetime
from flask import current_app, jsonify

# Fake database
users = {
    "joao": bcrypt.hashpw("12345".encode('utf-8'), bcrypt.gensalt()),
    "maria": bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt())
}

def login_user(data):
    username = data.get('username')
    password = data.get('password')

    if not username or not isinstance(username, str):
        return jsonify({"error": "Campo 'username' é obrigatório e deve ser texto"}), 400
    if not password or not isinstance(password, str):
        return jsonify({"error": "Campo 'password' é obrigatório e deve ser texto"}), 400

    hash_stored = users.get(username)

    if hash_stored and bcrypt.checkpw(password.encode('utf-8'), hash_stored):
        token = jwt.encode({
            'sub': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({"token": token})

    return jsonify({"error": "Credenciais inválidas"}), 401

def verify_token(token):
    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({"valid": True, "user": decoded['sub']})
    except jwt.ExpiredSignatureError:
        return jsonify({"valid": False, "error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"valid": False, "error": "Token inválido"}), 401
