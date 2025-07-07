from flask import Flask
from .routes import auth_routes
from .config import Config
from .database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(auth_routes)

    db.init_app(app)

    return app