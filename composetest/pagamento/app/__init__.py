from flask import Flask
from .routes import pagamento_bp
from .config import Config
from .database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(pagamento_bp)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    return app