from datetime import datetime
import uuid
from . import db

#def generate_uuid():
#    return str(uuid.uuid4())

class Pagamento(db.Model):
    __tablename__ = 'pagamento'

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    id_usuario = db.Column(db.String, nullable=False)
    id_curso = db.Column(db.String, nullable=False)
    valor = db.Column(db.Float, nullable=False)
    status = db.Column(db.String, default='pendente')
    data = db.Column(db.DateTime, default=datetime.now)

    def as_dict(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_curso": self.id_curso,
            "valor": self.valor,
            "status": self.status,
            "data": self.data.isoformat()
        }
