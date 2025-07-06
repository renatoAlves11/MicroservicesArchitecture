from flask import Blueprint, request, jsonify
from .auth import login_user, verify_token

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/', methods=['GET'])
def home():
    return "Microserviço de autenticação rodando!"

@auth_routes.route('/login', methods=['POST'])
def login():
    return login_user(request.json)

@auth_routes.route('/verify', methods=['POST'])
def verify():
    return verify_token(request.json.get('token'))
