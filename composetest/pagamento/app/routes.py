from flask import Blueprint, request, jsonify
import random
from .models import db, Pagamento
#import requests
import os
from sqlalchemy import text
from flask import render_template

pagamento_bp = Blueprint('pagamento', __name__)


'''
TEMOS DUAS OPCOES
O pagamento acessa direto o banco de dados e puxa o preco do curso
OU
(+ certo porem se o Cursos cair, o pagamento nao funciona {o q faz sentido})
O pagamento faz uma requisicao pr api que retorna o preco do curso
'''

# nsei se isso ta certo
#URL_CURSOS = os.environ.get("URL_CURSOS", "http://curso_conteudo:5000")

@pagamento_bp.route('/pagamento/<id_pagamento>', methods=['GET'])
def get_pagamento(id_pagamento):
    pagamento = Pagamento.query.get(id_pagamento)
    if pagamento:
        return jsonify(pagamento.as_dict()), 200
    return jsonify({'error': 'Not found'}), 404


@pagamento_bp.route('/pagamento', methods=['POST'])
def criar_pagamento():
    dados = request.get_json()

    if not dados or 'id' not in dados or 'id_curso' not in dados:
        return jsonify({'erro': 'Campos obrigatórios faltando'}), 400

    id_usuario = dados['id']
    id_curso = dados['id_curso']

    '''
    # Buscar o preço real do curso no serviço de cursos
    try:
        resp = requests.get(f"{URL_CURSOS}/cursos/{id_curso}")
        if resp.status_code != 200:
            return jsonify({'erro': 'Curso não encontrado'}), 404
        preco = resp.json().get('preco')
    except Exception as e:
        return jsonify({'erro': 'Falha ao consultar serviço de curso', 'detalhe': str(e)}), 503
    '''
    
    def obter_preco_curso(id_curso):
        sql = text('SELECT preco FROM curso WHERE id = :id')
        result = db.session.execute(sql, {'id': id_curso})
        row = result.fetchone()
        return row[0] if row else None

    
    preco = obter_preco_curso(id_curso)
    if preco is None:
        return jsonify({'erro': 'Curso não encontrado'}), 404

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
    return jsonify({'id': pagamento.id, 'status': pagamento.status, 'valor': pagamento.valor}), 200

"""@pagamento_bp.route('/teste_pagamento', methods=['GET', 'POST'])
def teste_pagamento():
    resposta = None
    if request.method == 'POST':
        id_usuario = request.form['id']
        id_curso = request.form['id_curso']

        try:
            resp = requests.get(f"{URL_CURSOS}/cursos/{id_curso}")
            if resp.status_code != 200:
                resposta = {"status": "Curso não encontrado", "id": "-", "valor": "-"}
            else:
                preco = resp.json().get('preco')
                pagamento = Pagamento(
                    id_usuario=id_usuario,
                    id_curso=id_curso,
                    valor=preco,
                    status='pendente'
                )
                db.session.add(pagamento)
                db.session.commit()

                pagamento.status = 'sucesso' if random.random() < 0.8 else 'falha'
                db.session.commit()

                resposta = {
                    "status": pagamento.status,
                    "id": pagamento.id,
                    "valor": pagamento.valor
                }
        except Exception as e:
            resposta = {"status": f"Erro: {e}", "id": "-", "valor": "-"}
    
    return render_template('pagamento.html', resposta=resposta)"""

