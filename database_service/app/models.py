from datetime import datetime
import uuid
from .database import db

# Modelo de Usuário (do serviço auth)
class Usuario(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)  # senha já hasheada

# Modelos de Curso e Conteúdo (do serviço curso_conteudo)
class Curso(db.Model):
    __tablename__ = "curso"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    preco = db.Column(db.Float, nullable=False)

    conteudos = db.relationship('Conteudo', backref='curso', cascade='all, delete-orphan')

class Conteudo(db.Model):
    __tablename__ = "conteudo"

    id = db.Column(db.Integer, primary_key=True)
    curso_id = db.Column(db.Integer, db.ForeignKey('curso.id'), nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    texto = db.Column(db.Text, nullable=False)
    ordem = db.Column(db.Integer, nullable=False)

# Modelo de Pagamento (do serviço pagamento)
class Pagamento(db.Model):
    __tablename__ = 'pagamento'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    id_usuario = db.Column(db.String, nullable=False)
    id_curso = db.Column(db.String, nullable=False)
    valor = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, default='pendente')
    data = db.Column(db.DateTime, default=datetime.utcnow)

    def as_dict(self):
        return {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_curso': self.id_curso,
            'valor': self.valor,
            'status': self.status,
            'data': self.data.isoformat() if self.data else None
        } 