from flask import Blueprint, request
from .controllers import create_user, get_user, update_user, delete_user

user_routes = Blueprint('users', __name__)

@user_routes.route('/', methods=['GET'])
def home():
    return "User Service rodando"

@user_routes.route('/users', methods=['POST'])
def create():
    return create_user(request.json)

@user_routes.route('/users/<user_id>', methods=['GET'])
def get(user_id):
    return get_user(user_id)

@user_routes.route('/users/<user_id>', methods=['PUT'])
def update(user_id):
    return update_user(user_id, request.json)

@user_routes.route('/users/<user_id>', methods=['DELETE'])
def delete(user_id):
    return delete_user(user_id)