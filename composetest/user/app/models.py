from .database import db
import uuid

class Usuario(db.Model):
    __tablename__ = "usuarios"
    
    #id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)  # senha já hasheada