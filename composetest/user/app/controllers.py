from .database import db
from .models import Usuario
import bcrypt

def criar_usuario(name: str, email: str, password: str):
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    new_user = Usuario(name=name, email=email, password=password_hash)
    db.session.add(new_user)
    db.session.commit()
    db.session.refresh(new_user)
    return new_user

def listar_usuarios():
    return Usuario.query.all()