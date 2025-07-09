from flask import Flask
from .routes import app_routes
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(app_routes)

    return app