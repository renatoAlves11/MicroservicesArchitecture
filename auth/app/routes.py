from flask import Blueprint, request, jsonify, session
from .auth import login_user, verify_token, register_user

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/', methods=['GET'])
def home():
    return "Microserviço de autenticação rodando!"

@auth_routes.route('/login', methods=['POST'])
def login():
    resp, status = login_user(request.json)
    if status == 200:
        data = resp.get_json()
        token = data.get('token')
        role = data.get('role')
        session['token'] = token
        session['user_role'] = role  # <- salvando o tipo
    return resp, status

@auth_routes.route('/verify', methods=['POST'])
def verify():
    data = request.json or {}
    return verify_token(data.get('token'))

@auth_routes.route('/register', methods=['POST'])
def register():
    resp, status = register_user(request.json)
    if status == 201:
        # login automático após registro
        email = request.json.get('email')
        password = request.json.get('password')
        login_resp, login_status = login_user({'email': email, 'password': password})
        if login_status == 200:
            data = login_resp.get_json()
            session['token'] = data.get('token')
            session['user_role'] = data.get('role')  # pega a role aqui também
    return resp, status

@auth_routes.route('/me', methods=['GET'])
def me():
    auth_header = request.headers.get('Authorization', '')
    print("Authorization header:", auth_header)

    if not auth_header.startswith('Bearer '):
        return jsonify({'authenticated': False, 'user': None}), 401

    token = auth_header.split(' ')[1]

    verify_resp, verify_status = verify_token(token)
    print("verify_token status:", verify_status)
    print("verify_token response:", verify_resp.get_data(as_text=True))

    if verify_status == 200:
        data = verify_resp.get_json()
        return jsonify({
            'authenticated': True,
            'user': data.get('user'),
            'role': data.get('role')  # <- retornando role
        })

    return jsonify({'authenticated': False, 'user': None}), 401
