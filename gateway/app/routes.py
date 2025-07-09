from flask import Flask, request, jsonify, Blueprint
import requests
from .decorators import role_required

app_routes = Blueprint('auth', __name__)

#Rotas autenticação

@app_routes.route('/auth', methods=['GET'])
def auth_vizualization():
    response = requests.get('http://auth:5000')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/login', methods=['POST'])
def auth_login():
    response = requests.post('http://auth:5000/login', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/verify', methods=['POST'])
def auth_verify():
    response = requests.post('http://auth:5000/verify', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/register', methods=['POST'])
def register():
    response = requests.post('http://auth:5000/register', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/me', methods=['GET'])
def me():
    # Pega o token que o cliente mandou para o gateway, por exemplo do header Authorization
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return "Unauthorized", 401

    # Repassa o header para o microserviço auth
    headers = {'Authorization': auth_header}
    response = requests.get('http://auth:5000/me', headers=headers)

    return (response.text, response.status_code, response.headers.items())

#Rotas gerenciamento de usuário

@app_routes.route('/users', methods=['GET'])
@role_required('administrador')
def listar_usuarios():
    response = requests.get('http://auth:5000/users', json=request.json)
    return (response.text, response.status_code, response.headers.items())

# Deletar usuário por ID (somente admin)
@app_routes.route('/users/<int:id_usuario>', methods=['DELETE'])
@role_required('administrador')
def deletar_usuario(id_usuario):
    response = requests.delete('http://auth:5000/users/<int:id_usuario>', json=request.json)
    return (response.text, response.status_code, response.headers.items())

# Atualizar role de um usuário (somente admin)
@app_routes.route('/usuarios/<int:id_usuario>/role', methods=['PATCH'])
@role_required('administrador')
def atualizar_role(id_usuario):
    response = requests.patch('http://auth:5000/users/<int:id_usuario>', json=request.json)
    return (response.text, response.status_code, response.headers.items())

#Rotas curso/conteúdo

#Curso

@app_routes.route('/cursos', methods=['GET'])
def listar_cursos():
    response = requests.get('http://cursos:5000/cursos')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos', methods=['POST'])
def criar_curso_api():
    response = requests.post('http://cursos:5000/cursos')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    response = requests.put('http://cursos:5000/cursos/<int:id>', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    response = requests.delete('http://cursos:5000/cursos/<int:id>')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos/<int:id>', methods=['GET'])
def ver_curso_api(id):
    response = requests.get('http://cursos:5000/cursos/<int:id>')
    return (response.text, response.status_code, response.headers.items())

# Conteúdos
@app_routes.route('/conteudos', methods=['POST'])
def adicionar_conteudo():
    response = requests.post('http://curso_conteudo:5000/conteudos', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos/<int:curso_id>/conteudos', methods=['GET'])
def listar_conteudos(curso_id):
    response = requests.get('http://curso_conteudo:5000/cursos/<int:curso_id>/conteudos')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/conteudos/<int:id>', methods=['PUT'])
def editar_conteudo_api(id):
    response = requests.put('http://curso_conteudo:5000/conteudos/<int:id>', json=request.json)
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/cursos/<int:curso_id>/conteudos/<int:conteudo_id>', methods=['DELETE'])
def deletar_conteudo(curso_id, conteudo_id):
    response = requests.delete('http://curso_conteudo:5000/cursos/<int:curso_id>/conteudos/<int:conteudo_id>', json=request.json)
    return (response.text, response.status_code, response.headers.items())

#Rotas pagamento

@app_routes.route('/pagamento/<id_pagamento>', methods=['GET'])
def get_pagamento(id_pagamento):
    response = requests.get('http://cursos:5000/pagamento/<id_pagamento>')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/pagamento', methods=['POST'])
def criar_pagamento():
    response = requests.post('http://cursos:5000/pagamento', json=request.json)
    return (response.text, response.status_code, response.headers.items())


@app_routes.route('/pagamentos', methods=['GET'])
def listar_pagamentos():
    response = requests.get('http://cursos:5000/pagamentos')
    return (response.text, response.status_code, response.headers.items())

@app_routes.route('/pagamentos/usuario/<id_usuario>', methods=['GET'])
def listar_pagamentos_usuario(id_usuario):
    response = requests.get('http://cursos:5000/pagamentos/usuario/<id_usuario>')
    return (response.text, response.status_code, response.headers.items())

