from flask import Blueprint, request, jsonify, render_template, redirect, url_for
from .models import Curso, Conteudo
from .database import db

curso_bp = Blueprint('curso', __name__, template_folder='../../frontend/templates')

@curso_bp.route('/cursos/web', methods=['GET'])
def exibir_cursos():
    cursos = Curso.query.all()
    return jsonify([
        {
            'id': curso.id,
            'titulo': curso.titulo,
            'descricao': curso.descricao,
            'preco': curso.preco
        } for curso in cursos
    ])

# Cursos
@curso_bp.route('/cursos', methods=['GET'])
def listar_cursos():
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
def criar_curso_api():
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
def listar_conteudos(curso_id):
    conteudos = Conteudo.query.filter_by(curso_id=curso_id).all()
    return jsonify([{'id': c.id, 'titulo': c.titulo, 'texto': c.texto} for c in conteudos])

@curso_bp.route('/cursos/<int:id>/editar', methods=['GET', 'POST'])
def editar_curso(id):
    curso = Curso.query.get_or_404(id)

    if request.method == 'POST':
        curso.titulo = request.form['titulo']
        curso.descricao = request.form['descricao']
        curso.preco = float(request.form['preco'])  # garantir que seja float
        db.session.commit()
        return render_template('cursos.html', cursos=db.Curso.query.all())

    return render_template('editar_curso.html', curso=curso)

@curso_bp.route('/cursos/novo', methods=['GET', 'POST'])
def criar_curso():
    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        preco = float(request.form['preco'])

        novo_curso = Curso(titulo=titulo, descricao=descricao, preco=preco)
        db.session.add(novo_curso)
        db.session.commit()

        # Redireciona com mensagem via query param
        return redirect(url_for('curso.listar_cursos_web', sucesso='true'))

    return render_template('criar_curso.html')

@curso_bp.route('/cursos/<int:id>/conteudos/novo', methods=['GET', 'POST'])
def criar_conteudo(id):
    curso = Curso.query.get_or_404(id)
    erro = None

    if request.method == 'POST':
        ordem = int(request.form['ordem'])
        titulo = request.form['titulo']
        texto = request.form['texto']

        # verificar ordem repetida
        if Conteudo.query.filter_by(curso_id=id, ordem=ordem).first():
            erro = f"Já existe um conteúdo com ordem {ordem} para este curso."
        else:
            novo = Conteudo(curso_id=id, ordem=ordem, titulo=titulo, texto=texto)
            db.session.add(novo)
            db.session.commit()
            return redirect(url_for('curso.ver_curso', id=id, sucesso='true'))

    return render_template('criar_conteudo.html', curso=curso, erro=erro)

@curso_bp.route('/cursos/<int:id>', methods=['GET'])
def ver_curso_api(id):
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
def editar_conteudo_api(id):
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