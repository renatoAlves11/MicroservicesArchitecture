from flask import Blueprint, request, jsonify
import requests
import os

pagamento_bp = Blueprint('pagamento', __name__)

def get_database_service_url():
    return os.environ.get('DATABASE_SERVICE_URL', 'http://localhost:8004')

#Estados do pagamento
@pagamento_bp.route('/pagamento/<id_pagamento>/status', methods=['PATCH'])
def atualizar_status_pagamento(id_pagamento):
    data = request.get_json()

    try:
        # Chamada para o serviço banco, enviando o JSON recebido
        response = requests.patch(f"{get_database_service_url()}/pagamento/{id_pagamento}/status", json=data)
        if response.status_code == 200:
            return response.json(), 200
        else:
            return jsonify({"error": "Erro ao atualizar status do pagamento"}), response.status_code
    except requests.RequestException as e:
        return jsonify({"error": "Erro ao conectar com serviço de banco"}), 500

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

    if not id_usuario or not id_curso:
        return jsonify({'error': 'id_usuario e id_curso são obrigatórios'}), 400

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
        return jsonify({'error': 'Erro ao obter o preço do curso'}), 500

    try:
        # Criação do pagamento com status inicial como "pendente"
        pagamento = {
            'id_usuario': id_usuario,
            'id_curso': id_curso,
            'valor': valor,
            'status': 'pendente'
        }

        # Envia para o serviço de banco (pagamentos)
        response = requests.post(f"{get_database_service_url()}/pagamento", json=pagamento)

        return (response.text, response.status_code, response.headers.items())
    
    except requests.RequestException:
        return jsonify({'error': 'Erro ao comunicar com serviço de banco'}), 500

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

#Transições de estado
# Finalizar pagamento
@pagamento_bp.route('/pagamento/<id_pagamento>/finalizar', methods=['PATCH'])
def finalizar_pagamento(id_pagamento):
    try:
        response = requests.patch(
            f"{get_database_service_url()}/pagamento/{id_pagamento}/status",
            json={"status": "pago"}
        )
        return (response.text, response.status_code, response.headers.items())
    except requests.RequestException:
        return jsonify({'error': 'Erro ao se comunicar com o serviço de banco'}), 500


# Cancelar pagamento
@pagamento_bp.route('/pagamento/<id_pagamento>/cancelar', methods=['PATCH'])
def cancelar_pagamento(id_pagamento):
    try:
        response = requests.patch(
            f"{get_database_service_url()}/pagamento/{id_pagamento}/status",
            json={"status": "falhou"}
        )
        return (response.text, response.status_code, response.headers.items())
    except requests.RequestException:
        return jsonify({'error': 'Erro ao se comunicar com o serviço de banco'}), 500
