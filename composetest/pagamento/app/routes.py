from flask import Blueprint, request, jsonify
import random
from .models import db, Pagamento
import requests
import os

pagamento_bp = Blueprint('pagamento', __name__)


'''
TEMOS DUAS OPCOES
O pagamento acessa direto o banco de dados e puxa o preco do curso
OU
(+ certo porem se o Cursos cair, o pagamento nao funciona {o q faz sentido})
O pagamento faz uma requisicao pr api que retorna o preco do curso
'''

# nsei se isso ta certo
URL_CURSOS = os.environ.get("URL_CURSOS", "http://curso_conteudo:5000")

@pagamento_bp.route('/pagamento', methods=['POST'])
def criar_pagamento():
    dados = request.get_json()

    if not dados or 'id' not in dados or 'id_curso' not in dados:
        return jsonify({'erro': 'Campos obrigatórios faltando'}), 400

    id_usuario = dados['id']
    id_curso = dados['id_curso']

    # Buscar o preço real do curso no serviço de cursos
    try:
        resp = requests.get(f"{URL_CURSOS}/cursos/{id_curso}")
        if resp.status_code != 200:
            return jsonify({'erro': 'Curso não encontrado'}), 404
        preco = resp.json().get('preco')
    except Exception as e:
        return jsonify({'erro': 'Falha ao consultar serviço de curso', 'detalhe': str(e)}), 503
    
    ## logica!
    pagamento = Pagamento(
        id_usuario=id_usuario,
        id_curso=id_curso,
        valor=preco,
        # data=dados["data"], ja ta default? 
        status="pendente"
    )

    db.session.add(pagamento)
    db.session.commit()

    # simular o processamento do pagamento

    # fingir q pode da errado
    pagamento.status = 'sucesso' if random.random() < 0.8 else 'falha'

    db.session.commit()
    return jsonify({'id': pagamento.id, 'status': pagamento.status, 'valor': pagamento.preco}), 200

@pagamento_bp.route('/pagamento/<id_pagamento>', methods=['GET'])
def get_pagamento(id_pagamento):
    pagamento = Pagamento.query.get(id_pagamento)
    if pagamento:
        return jsonify(pagamento.as_dict()), 200
    return jsonify({'error': 'Not found'}), 404


