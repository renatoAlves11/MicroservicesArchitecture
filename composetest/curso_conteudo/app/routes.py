from flask import Blueprint, request, jsonify, render_template, redirect, url_for
from .models import Curso, Conteudo
from .database import db

curso_bp = Blueprint('curso', __name__, template_folder='../../frontend/templates')

#Cursos

@curso_bp.route('/cursos', methods=['GET'])
def exibir_cursos():  #Exibe informações do curso sem seus conteúdos
    cursos = Curso.query.all()
    return jsonify([
        {
            'id': curso.id,
            'titulo': curso.titulo,
            'descricao': curso.descricao,
            'preco': curso.preco
        } for curso in cursos
    ])

@curso_bp.route('/cursos', methods=['POST'])
def criar_curso():
    data = request.get_json()
    
    titulo = data.get('titulo')
    descricao = data.get('descricao')
    preco = float(data.get('preco', 0))

    novo_curso = Curso(titulo=titulo, descricao=descricao, preco=preco)
    db.session.add(novo_curso)
    db.session.commit()

    return jsonify({'mensagem': 'Curso criado com sucesso', 'id': novo_curso.id}), 201

@curso_bp.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    curso = Curso.query.get_or_404(id)
    data = request.get_json()
    curso.titulo = data['titulo']
    curso.descricao = data['descricao']
    curso.preco = data.get('preco', curso.preco)
    db.session.commit()
    return jsonify({'mensagem': 'Curso atualizado'})

@curso_bp.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    curso = Curso.query.get_or_404(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify({'mensagem': 'Curso deletado'})

# Conteúdos
@curso_bp.route('/conteudos', methods=['POST'])
def adicionar_conteudo():
    data = request.get_json()
    conteudo = Conteudo(
        curso_id=data['curso_id'],
        ordem=data['ordem'],
        titulo=data['titulo'],
        texto=data['texto']
    )

    if Conteudo.query.filter_by(curso_id=conteudo.curso_id, ordem=conteudo.ordem).first():
        return jsonify({'erro': f'Ordem {conteudo.ordem} já existe'}), 400

    db.session.add(conteudo)
    db.session.commit()
    return jsonify({'mensagem': 'Conteúdo adicionado'}), 201

@curso_bp.route('/cursos/<int:curso_id>/conteudos', methods=['GET'])
def listar_conteudos(curso_id):  #Lista conteúdos de um curso
    conteudos = Conteudo.query.filter_by(curso_id=curso_id).all()
    return jsonify([{'id': c.id, 'titulo': c.titulo, 'texto': c.texto} for c in conteudos])

@curso_bp.route('/conteudos', methods=['POST'])
def adicionar_conteudo():
    data = request.get_json()
    conteudo = Conteudo(
        curso_id=data['curso_id'],
        ordem=data['ordem'],
        titulo=data['titulo'],
        texto=data['texto']
    )

    if Conteudo.query.filter_by(curso_id=conteudo.curso_id, ordem=conteudo.ordem).first():
        return jsonify({'erro': f'Ordem {conteudo.ordem} já existe'}), 400

    db.session.add(conteudo)
    db.session.commit()
    return jsonify({'mensagem': 'Conteúdo adicionado'}), 201

@curso_bp.route('/cursos/<int:id>', methods=['GET'])
def ver_curso_api(id):  #Permite ver cursos e seus respectivos conteúdos
    curso = Curso.query.get_or_404(id)
    conteudos = Conteudo.query.filter_by(curso_id=id).order_by(Conteudo.ordem).all()

    return jsonify({
        'id': curso.id,
        'titulo': curso.titulo,
        'descricao': curso.descricao,
        'preco': curso.preco,
        'conteudos': [
            {'id': c.id, 'ordem': c.ordem, 'titulo': c.titulo, 'texto': c.texto}
            for c in conteudos
        ]
    })

@curso_bp.route('/cursos/<int:curso_id>/conteudos/<int:conteudo_id>/deletar', methods=['POST'])
def deletar_conteudo(curso_id, conteudo_id):
    conteudo = Conteudo.query.get_or_404(conteudo_id)
    db.session.delete(conteudo)
    db.session.commit()
    return redirect(url_for('curso.ver_curso', id=curso_id))

@curso_bp.route('/conteudos/<int:id>', methods=['PUT'])
def editar_conteudo(id):
    conteudo = Conteudo.query.get_or_404(id)
    data = request.get_json()

    nova_ordem = data.get('ordem')
    if Conteudo.query.filter(Conteudo.curso_id == conteudo.curso_id, Conteudo.ordem == nova_ordem, Conteudo.id != conteudo.id).first():
        return jsonify({'erro': f'Ordem {nova_ordem} já existe para este curso'}), 400

    conteudo.ordem = nova_ordem
    conteudo.titulo = data.get('titulo', conteudo.titulo)
    conteudo.texto = data.get('texto', conteudo.texto)
    db.session.commit()

    return jsonify({'mensagem': 'Conteúdo atualizado'})