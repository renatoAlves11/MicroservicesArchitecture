from flask import Blueprint, request, jsonify
from .models import Usuario, Curso, Conteudo, Pagamento
from .database import db

db_routes = Blueprint('database', __name__)

# Rotas para Usuários
@db_routes.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id': u.id,
        'name': u.name,
        'email': u.email,
        'password': u.password  # Adicionado para uso interno
    } for u in usuarios])

@db_routes.route('/usuarios/<int:id>', methods=['GET'])
def obter_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    return jsonify({
        'id': usuario.id,
        'name': usuario.name,
        'email': usuario.email
    })

@db_routes.route('/usuarios', methods=['POST'])
def criar_usuario():
    data = request.get_json()
    novo_usuario = Usuario(
        name=data['name'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(novo_usuario)
    db.session.commit()
    return jsonify({
        'id': novo_usuario.id,
        'name': novo_usuario.name,
        'email': novo_usuario.email
    }), 201

@db_routes.route('/usuarios/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    data = request.get_json()
    
    if 'name' in data:
        usuario.name = data['name']
    if 'email' in data:
        usuario.email = data['email']
    if 'password' in data:
        usuario.password = data['password']
    
    db.session.commit()
    return jsonify({
        'id': usuario.id,
        'name': usuario.name,
        'email': usuario.email
    })

@db_routes.route('/usuarios/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({'message': 'Usuário deletado com sucesso'})

# Rotas para Cursos
@db_routes.route('/cursos', methods=['GET'])
def listar_cursos():
    cursos = Curso.query.all()
    return jsonify([{
        'id': c.id,
        'titulo': c.titulo,
        'descricao': c.descricao,
        'preco': c.preco
    } for c in cursos])

@db_routes.route('/cursos/<int:id>', methods=['GET'])
def obter_curso(id):
    curso = Curso.query.get_or_404(id)
    conteudos = Conteudo.query.filter_by(curso_id=id).order_by(Conteudo.ordem).all()
    return jsonify({
        'id': curso.id,
        'titulo': curso.titulo,
        'descricao': curso.descricao,
        'preco': curso.preco,
        'conteudos': [{
            'id': c.id,
            'ordem': c.ordem,
            'titulo': c.titulo,
            'texto': c.texto
        } for c in conteudos]
    })

@db_routes.route('/cursos', methods=['POST'])
def criar_curso():
    data = request.get_json()
    novo_curso = Curso(
        titulo=data['titulo'],
        descricao=data['descricao'],
        preco=data['preco']
    )
    db.session.add(novo_curso)
    db.session.commit()
    return jsonify({
        'id': novo_curso.id,
        'titulo': novo_curso.titulo,
        'descricao': novo_curso.descricao,
        'preco': novo_curso.preco
    }), 201

@db_routes.route('/cursos/<int:id>', methods=['PUT'])
def atualizar_curso(id):
    curso = Curso.query.get_or_404(id)
    data = request.get_json()
    
    if 'titulo' in data:
        curso.titulo = data['titulo']
    if 'descricao' in data:
        curso.descricao = data['descricao']
    if 'preco' in data:
        curso.preco = data['preco']
    
    db.session.commit()
    return jsonify({
        'id': curso.id,
        'titulo': curso.titulo,
        'descricao': curso.descricao,
        'preco': curso.preco
    })

@db_routes.route('/cursos/<int:id>', methods=['DELETE'])
def deletar_curso(id):
    curso = Curso.query.get_or_404(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify({'message': 'Curso deletado com sucesso'})

# Rotas para Conteúdos
@db_routes.route('/conteudos', methods=['GET'])
def listar_conteudos():
    conteudos = Conteudo.query.all()
    return jsonify([{
        'id': c.id,
        'curso_id': c.curso_id,
        'titulo': c.titulo,
        'texto': c.texto,
        'ordem': c.ordem
    } for c in conteudos])

@db_routes.route('/conteudos/<int:curso_id>', methods=['GET'])
def listar_conteudos_curso(curso_id):
    conteudos = Conteudo.query.filter_by(curso_id=curso_id).order_by(Conteudo.ordem).all()
    return jsonify([{
        'id': c.id,
        'titulo': c.titulo,
        'texto': c.texto,
        'ordem': c.ordem
    } for c in conteudos])

@db_routes.route('/conteudos', methods=['POST'])
def criar_conteudo():
    data = request.get_json()
    novo_conteudo = Conteudo(
        curso_id=data['curso_id'],
        titulo=data['titulo'],
        texto=data['texto'],
        ordem=data['ordem']
    )
    db.session.add(novo_conteudo)
    db.session.commit()
    return jsonify({
        'id': novo_conteudo.id,
        'curso_id': novo_conteudo.curso_id,
        'titulo': novo_conteudo.titulo,
        'texto': novo_conteudo.texto,
        'ordem': novo_conteudo.ordem
    }), 201

@db_routes.route('/conteudos/<int:id>', methods=['PUT'])
def atualizar_conteudo(id):
    conteudo = Conteudo.query.get_or_404(id)
    data = request.get_json()
    
    if 'titulo' in data:
        conteudo.titulo = data['titulo']
    if 'texto' in data:
        conteudo.texto = data['texto']
    if 'ordem' in data:
        conteudo.ordem = data['ordem']
    
    db.session.commit()
    return jsonify({
        'id': conteudo.id,
        'curso_id': conteudo.curso_id,
        'titulo': conteudo.titulo,
        'texto': conteudo.texto,
        'ordem': conteudo.ordem
    })

@db_routes.route('/conteudos/<int:id>', methods=['DELETE'])
def deletar_conteudo(id):
    conteudo = Conteudo.query.get_or_404(id)
    db.session.delete(conteudo)
    db.session.commit()
    return jsonify({'message': 'Conteúdo deletado com sucesso'})

# Rotas para Pagamentos
@db_routes.route('/pagamentos', methods=['GET'])
def listar_pagamentos():
    pagamentos = Pagamento.query.all()
    return jsonify([p.as_dict() for p in pagamentos])

@db_routes.route('/pagamentos/<id_pagamento>', methods=['GET'])
def obter_pagamento(id_pagamento):
    pagamento = Pagamento.query.get_or_404(id_pagamento)
    return jsonify(pagamento.as_dict())

@db_routes.route('/pagamentos', methods=['POST'])
def criar_pagamento():
    data = request.get_json()
    novo_pagamento = Pagamento(
        id_usuario=data['id_usuario'],
        id_curso=data['id_curso'],
        valor=data['valor'],
        status=data.get('status', 'pendente')
    )
    db.session.add(novo_pagamento)
    db.session.commit()
    return jsonify(novo_pagamento.as_dict()), 201

@db_routes.route('/pagamentos/usuario/<id_usuario>', methods=['GET'])
def listar_pagamentos_usuario(id_usuario):
    pagamentos = Pagamento.query.filter_by(id_usuario=id_usuario).all()
    return jsonify([p.as_dict() for p in pagamentos])

@db_routes.route('/pagamentos/<id_pagamento>', methods=['PUT'])
def atualizar_pagamento(id_pagamento):
    pagamento = Pagamento.query.get_or_404(id_pagamento)
    data = request.get_json()
    
    if 'status' in data:
        pagamento.status = data['status']
    if 'valor' in data:
        pagamento.valor = data['valor']
    
    db.session.commit()
    return jsonify(pagamento.as_dict())

@db_routes.route('/pagamentos/<id_pagamento>', methods=['DELETE'])
def deletar_pagamento(id_pagamento):
    pagamento = Pagamento.query.get_or_404(id_pagamento)
    db.session.delete(pagamento)
    db.session.commit()
    return jsonify({'message': 'Pagamento deletado com sucesso'})

# Rota de health check
@db_routes.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'database_service'}) 