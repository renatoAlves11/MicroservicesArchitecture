from flask import Flask
from .config import Config
from .routes import curso_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(curso_bp)

    return app