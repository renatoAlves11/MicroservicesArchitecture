from flask import Blueprint, request, jsonify
from .models import *
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
        'password': u.password,  # Adicionado para uso interno
        'role' : u.role
    } for u in usuarios])

@db_routes.route('/usuarios/<int:id>', methods=['GET'])
def obter_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    return jsonify({
        'id': usuario.id,
        'name': usuario.name,
        'email': usuario.email,
        'role' : usuario.role
    })

@db_routes.route('/usuarios', methods=['POST'])
def criar_usuario():
    data = request.get_json()
    novo_usuario = Usuario(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role = data['role']
    )
    db.session.add(novo_usuario)
    db.session.commit()
    return jsonify({
        'id': novo_usuario.id,
        'name': novo_usuario.name,
        'email': novo_usuario.email,
        'role' : novo_usuario.role
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
    if 'role' in data:
        usuario.role = data['role']
    
    db.session.commit()
    return jsonify({
        'id': usuario.id,
        'name': usuario.name,
        'email': usuario.email,
        'role' : usuario.role
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

#Estados de pagamento
@db_routes.route('/pagamento/<id_pagamento>/status', methods=['PATCH'])
def atualizar_status_pagamento(id_pagamento):
    ESTADOS_VALIDOS = ['pendente', 'pago', 'falhou', 'reembolsado']

    TRANSICOES_VALIDAS = {
        'pendente': ['pago', 'falhou'],
        'pago': ['reembolsado'],
        'falhou': [],
        'reembolsado': []
    }

    pagamento = Pagamento.query.filter_by(id=id_pagamento).first()
    if not pagamento:
        return jsonify({'error': 'Pagamento não encontrado'}), 404

    estado_atual = pagamento.status
    novo_status = request.get_json().get('status')  # Espera { "status": "pago" }, por exemplo

    if novo_status not in ESTADOS_VALIDOS:
        return jsonify({'error': f'Status inválido: {novo_status}'}), 400

    if novo_status not in TRANSICOES_VALIDAS.get(estado_atual, []):
        return jsonify({'error': f'Transição inválida de {estado_atual} para {novo_status}'}), 400

    pagamento.status = novo_status
    db.session.commit()
    return jsonify({'mensagem': f'Status atualizado para {novo_status}'}), 200

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


# Matricular usuário em um curso
@db_routes.route('/matricula', methods=['POST'])
def criar_matricula():
    data = request.get_json()

    if not data.get('id_usuario') or not data.get('id_curso'):
        return jsonify({'error': 'Campos obrigatórios: id_usuario e id_curso'}), 400

    # Verificar se já existe
    existente = Matricula.query.filter_by(id_usuario=data['id_usuario'], id_curso=data['id_curso']).first()
    if existente:
        return jsonify({'error': 'Usuario já está matriculado nesse curso'}), 409

    nova_matricula = Matricula(
        id_usuario=data['id_usuario'],
        id_curso=data['id_curso'],
        data_matricula=datetime.utcnow()
    )
    db.session.add(nova_matricula)
    db.session.commit()
    return jsonify(nova_matricula.as_dict()), 201

@db_routes.route('/matricula/usuario/curso/<id_usuario>/<id_curso>', methods=['GET'])
def verificar_matricula_usuario_curso(id_usuario, id_curso):
    matricula = Matricula.query.filter_by(id_usuario=id_usuario, id_curso=id_curso).first()
    if matricula:
        return jsonify(matricula.as_dict()), 200
    else:
        return jsonify({'message': 'Usuário não matriculado'}), 404

@db_routes.route('/matricula/usuario/<id_usuario>', methods=['GET'])
def listar_matriculas_usuario(id_usuario):
    matriculas = Matricula.query.filter_by(id_usuario=id_usuario).all()
    cursos_matriculados = []
    for m in matriculas:
        curso = Curso.query.get(m.id_curso)
        if curso:
            cursos_matriculados.append({
                'id': curso.id,
                'titulo': curso.titulo,
                'descricao': curso.descricao,
                'preco': curso.preco,
                'data_matricula': m.data_matricula.isoformat()
            })
    return jsonify(cursos_matriculados), 200

@db_routes.route('/matricula/usuario/curso/<id_curso>', methods=['GET'])
def listar_usuarios_matriculados_no_curso(id_curso):
    matriculas = Matricula.query.filter_by(id_curso=id_curso).all()

    usuarios_matriculados = []
    for m in matriculas:
        usuarios_matriculados.append({
            'id_usuario': m.id_usuario,
            'data_matricula': m.data_matricula.isoformat()
        })

    return jsonify(usuarios_matriculados), 200

@db_routes.route('/matricula/usuario/<id_usuario>/curso/<id_curso>', methods=['DELETE'])
def deletar_matricula_usuario_curso(id_usuario, id_curso):
    matricula = Matricula.query.filter_by(id_usuario=id_usuario, id_curso=id_curso).first()
    if not matricula:
        return jsonify({'error': 'Matrícula não encontrada'}), 404

    db.session.delete(matricula)
    db.session.commit()
    return jsonify({'mensagem': 'Matrícula removida com sucesso'}), 200

# Rota de health check
@db_routes.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'database_service'}) 