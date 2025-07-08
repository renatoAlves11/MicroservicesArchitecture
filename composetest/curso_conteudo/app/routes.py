from flask import Blueprint, request, jsonify, render_template, redirect, url_for
from .database import db

curso_bp = Blueprint('curso', __name__)

@curso_bp.route('/')
def home():
    return render_template('index.html')

# Cursos
@curso_bp.route('/cursos', methods=['GET'])
def listar_cursos():
    cursos = db.Curso.query.all()
    return jsonify([
        {
            'id': curso.id,
            'titulo': curso.titulo,
            'descricao': curso.descricao,
            'preco': curso.preco
        } for curso in cursos
    ])

@curso_bp.route('/cursos/novo', methods=['GET', 'POST'])
def criar_curso_web():
    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        preco = float(request.form['preco'])

        novo_curso = db.Curso(titulo=titulo, descricao=descricao, preco=preco)
        db.session.add(novo_curso)
        db.session.commit()

        return redirect(url_for('curso.exibir_cursos', sucesso='true'))

    return render_template('criar_curso.html')

@curso_bp.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    curso = db.Curso.query.get_or_404(id)
    data = request.get_json()
    curso.titulo = data['titulo']
    curso.descricao = data['descricao']
    curso.preco = data.get('preco', curso.preco)
    db.session.commit()
    return jsonify({'mensagem': 'Curso atualizado'})

@curso_bp.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    curso = db.Curso.query.get_or_404(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify({'mensagem': 'Curso deletado'})

# Conteúdos
@curso_bp.route('/conteudos', methods=['POST'])
def adicionar_conteudo():
    data = request.get_json()
    conteudo = db.Conteudo(curso_id=data['curso_id'], titulo=data['titulo'], texto=data['texto'])
    db.session.add(conteudo)
    db.session.commit()
    return jsonify({'mensagem': 'Conteúdo adicionado'}), 201

@curso_bp.route('/cursos/<int:curso_id>/conteudos', methods=['GET'])
def listar_conteudos(curso_id):
    conteudos = db.Conteudo.query.filter_by(curso_id=curso_id).all()
    return jsonify([{'id': c.id, 'titulo': c.titulo, 'texto': c.texto} for c in conteudos])

@curso_bp.route('/cursos/web', methods=['GET'])
def exibir_cursos():
    cursos = db.Curso.query.all()
    sucesso = request.args.get('sucesso') == 'true'
    return render_template('cursos.html', cursos=cursos, sucesso=sucesso)

@curso_bp.route('/cursos/<int:id>/editar', methods=['GET', 'POST'])
def editar_curso(id):
    curso = db.Curso.query.get_or_404(id)

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

        novo_curso = db.Curso(titulo=titulo, descricao=descricao, preco=preco)
        db.session.add(novo_curso)
        db.session.commit()

        # Redireciona com mensagem via query param
        return redirect(url_for('curso.listar_cursos_web', sucesso='true'))

    return render_template('criar_curso.html')

@curso_bp.route('/cursos/<int:id>/conteudos/novo', methods=['GET', 'POST'])
def criar_conteudo(id):
    curso = db.Curso.query.get_or_404(id)
    erro = None

    if request.method == 'POST':
        ordem = int(request.form['ordem'])
        titulo = request.form['titulo']
        texto = request.form['texto']

        # verificar ordem repetida
        if db.Conteudo.query.filter_by(curso_id=id, ordem=ordem).first():
            erro = f"Já existe um conteúdo com ordem {ordem} para este curso."
        else:
            novo = db.Conteudo(curso_id=id, ordem=ordem, titulo=titulo, texto=texto)
            db.session.add(novo)
            db.session.commit()
            return redirect(url_for('curso.ver_curso', id=id, sucesso='true'))

    return render_template('criar_conteudo.html', curso=curso, erro=erro)

@curso_bp.route('/cursos/<int:id>/ver', methods=['GET'])
def ver_curso(id):
    curso = db.Curso.query.get_or_404(id)
    sucesso = request.args.get('sucesso') == 'true'
    return render_template('ver_curso.html', curso=curso, sucesso=sucesso)

@curso_bp.route('/cursos/<int:curso_id>/conteudos/<int:conteudo_id>/deletar', methods=['POST'])
def deletar_conteudo(curso_id, conteudo_id):
    conteudo = db.Conteudo.query.get_or_404(conteudo_id)
    db.session.delete(conteudo)
    db.session.commit()
    return redirect(url_for('curso.ver_curso', id=curso_id))

@curso_bp.route('/cursos/<int:curso_id>/conteudos/<int:conteudo_id>/editar', methods=['GET', 'POST'])
def editar_conteudo(curso_id, conteudo_id):
    curso = db.Curso.query.get_or_404(curso_id)
    conteudo = db.Conteudo.query.get_or_404(conteudo_id)
    erro = None

    if request.method == 'POST':
        nova_ordem = int(request.form['ordem'])
        if db.Conteudo.query.filter(db.Conteudo.curso_id == curso_id, db.Conteudo.ordem == nova_ordem, db.Conteudo.id != conteudo_id).first():
            erro = f"Já existe um conteúdo com ordem {nova_ordem} para este curso."
        else:
            conteudo.ordem = nova_ordem
            conteudo.titulo = request.form['titulo']
            conteudo.texto = request.form['texto']
            db.session.commit()
            return redirect(url_for('curso.ver_curso', id=curso_id, sucesso='true'))

    return render_template('editar_conteudo.html', curso=curso, conteudo=conteudo, erro=erro)