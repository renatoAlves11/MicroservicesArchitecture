from flask import Blueprint, request, jsonify
import requests
import os

curso_bp = Blueprint('curso', __name__)

def get_database_service_url():
    return os.environ.get('DATABASE_SERVICE_URL', 'http://localhost:8004')

# Cursos
@curso_bp.route('/cursos', methods=['GET'])
def listar_cursos():
    try:
        response = requests.get(f"{get_database_service_url()}/cursos")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao buscar cursos"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos', methods=['POST'])
def criar_curso_api():
    data = request.get_json()
    try:
        response = requests.post(f"{get_database_service_url()}/cursos", json=data)
        if response.status_code == 201:
            return response.json(), 201
        else:
            return jsonify({"error": "Erro ao criar curso"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    data = request.get_json()
    try:
        response = requests.put(f"{get_database_service_url()}/cursos/{id}", json=data)
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao atualizar curso"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    try:
        response = requests.delete(f"{get_database_service_url()}/cursos/{id}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao deletar curso"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos/<int:id>', methods=['GET'])
def ver_curso_api(id):
    try:
        response = requests.get(f"{get_database_service_url()}/cursos/{id}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Curso não encontrado"}), 404
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

# Conteúdos
@curso_bp.route('/conteudos', methods=['POST'])
def adicionar_conteudo():
    data = request.get_json()
    try:
        response = requests.post(f"{get_database_service_url()}/conteudos", json=data)
        if response.status_code == 201:
            return response.json(), 201
        else:
            return jsonify({"error": "Erro ao criar conteúdo"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos/<int:curso_id>/conteudos', methods=['GET'])
def listar_conteudos(curso_id):
    try:
        response = requests.get(f"{get_database_service_url()}/conteudos/{curso_id}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao buscar conteúdos"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/conteudos/<int:id>', methods=['PUT'])
def editar_conteudo_api(id):
    data = request.get_json()
    try:
        response = requests.put(f"{get_database_service_url()}/conteudos/{id}", json=data)
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao atualizar conteúdo"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

@curso_bp.route('/cursos/<int:curso_id>/conteudos/<int:conteudo_id>', methods=['DELETE'])
def deletar_conteudo(curso_id, conteudo_id):
    try:
        response = requests.delete(f"{get_database_service_url()}/conteudos/{conteudo_id}")
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao deletar conteúdo"}), 500
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500