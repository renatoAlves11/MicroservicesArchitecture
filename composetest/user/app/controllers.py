from flask import jsonify
from .models import users_db
import uuid

def create_user(data):
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Campos 'name' e 'email' são obrigatórios"}), 400

    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "id": user_id,
        "name": name,
        "email": email
    }
    return jsonify(users_db[user_id]), 201

def get_user(user_id):
    user = users_db.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404
    return jsonify(user)

def update_user(user_id, data):
    user = users_db.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado"}), 404

    user["name"] = data.get("name", user["name"])
    user["email"] = data.get("email", user["email"])
    return jsonify(user)

def delete_user(user_id):
    if user_id in users_db:
        del users_db[user_id]
        return jsonify({"message": "Usuário deletado"}), 200
    return jsonify({"error": "Usuário não encontrado"}), 404