from flask import Flask
from .config import Config
from .routes import pagamento_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(pagamento_bp)

    return app