# app/auth/decorators.py
from functools import wraps
from flask import request, jsonify, current_app
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

def role_required(*roles_permitidas):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get('Authorization', '')
            if not auth_header.startswith('Bearer '):
                return jsonify({'error': 'Token ausente ou inválido'}), 401

            token = auth_header.split(' ')[1]

            try:
                decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
                user_role = decoded.get('role')
                if user_role not in roles_permitidas:
                    return jsonify({'error': f"Acesso negado. Role '{user_role}' não autorizada"}), 403
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token expirado'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Token inválido'}), 401

            return func(*args, **kwargs)
        return wrapper
    return decorator
