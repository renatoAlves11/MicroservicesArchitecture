import bcrypt
import jwt
import datetime
from flask import current_app, jsonify
from .database import db

def auth_user(email: str, password: str):
    usuario = db.Usuario.query.filter(db.Usuario.email == email).first()
    if usuario and bcrypt.checkpw(password.encode(), usuario.password.encode()):
        return usuario
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
