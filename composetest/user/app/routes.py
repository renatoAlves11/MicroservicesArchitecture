from flask import Blueprint, request, jsonify
from .database import db  # <-- usa db do Flask-SQLAlchemy
from .controllers import criar_usuario, listar_usuarios

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/user", methods=["POST"])
def login():
    data = request.get_json()
    try:
        usuario = criar_usuario(data["name"], data["email"], data["password"])
        return jsonify({"id": usuario.id, "email": usuario.email}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": str(e)}), 500

@user_routes.route("/user", methods=["GET"])
def get_usuarios():
    usuarios = listar_usuarios()
    return jsonify([
        {"id": u.id, "name": u.name, "email": u.email}
        for u in usuarios
    ])