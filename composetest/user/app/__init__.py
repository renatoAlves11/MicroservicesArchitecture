from flask import Flask
from .routes import user_routes
from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(user_routes)

    print("DB URI:", app.config.get("SQLALCHEMY_DATABASE_URI"))  # veja o que imprime

    db.init_app(app)  # <---- importante!

    with app.app_context():
        db.create_all()

    return app