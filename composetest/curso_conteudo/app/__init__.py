from flask import Flask
from .config import Config
from .routes import curso_bp
from .database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)  

    app.register_blueprint(curso_bp)

    with app.app_context():
        db.create_all()

    return app