from flask import Flask, request, jsonify
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'segredo-muito-seguro'

# Banco de usuários fake
users = {
    "joao": "123456",
    "maria": "abcdef"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users.get(username) == password:
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
