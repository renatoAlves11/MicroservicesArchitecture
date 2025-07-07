from flask import Flask
from .routes import user_routes
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(user_routes)
    return app