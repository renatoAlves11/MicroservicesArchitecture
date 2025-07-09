from flask import Blueprint, request, jsonify
import requests
import os

pagamento_bp = Blueprint('pagamento', __name__)

def get_database_service_url():
    return os.environ.get('DATABASE_SERVICE_URL', 'http://localhost:8004')

@pagamento_bp.route('/pagamento/<id_pagamento>', methods=['GET'])
def get_pagamento(id_pagamento):
    try:
        response = requests.get(f"{get_database_service_url()}/pagamentos/{id_pagamento}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Pagamento não encontrado"}), 404
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@pagamento_bp.route('/pagamento', methods=['POST'])
def criar_pagamento():
    data = request.get_json()
    id_usuario = data.get('id_usuario')
    id_curso = data.get('id_curso')

    def obter_preco_curso(id_curso):
        try:
            response = requests.get(f"http://curso_conteudo:5000/cursos/{id_curso}")
            if response.status_code == 200:
                curso = response.json()
                return curso['preco']
            else:
                return None
        except requests.RequestException:
            return None

    valor = obter_preco_curso(id_curso)
    if valor is None:
        return jsonify({"error": "Curso não encontrado"}), 404

    try:
        response = requests.post(f"{get_database_service_url()}/pagamentos", json={
            'id_usuario': id_usuario,
            'id_curso': id_curso,
            'valor': valor,
            'status': 'pendente'
        })
        if response.status_code == 201:
            pagamento = response.json()
            return jsonify({"status": pagamento['status'], "id": pagamento['id']}), 201
        else:
            return jsonify({"error": "Erro ao criar pagamento"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@pagamento_bp.route('/pagamentos', methods=['GET'])
def listar_pagamentos():
    try:
        response = requests.get(f"{get_database_service_url()}/pagamentos")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao buscar pagamentos"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@pagamento_bp.route('/pagamentos/usuario/<id_usuario>', methods=['GET'])
def listar_pagamentos_usuario(id_usuario):
    try:
        response = requests.get(f"{get_database_service_url()}/pagamentos/usuario/{id_usuario}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao buscar pagamentos do usuário"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

