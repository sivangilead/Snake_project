import os
from .config import *
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .shared_db import db


def create_app(test_config=None):
    app = Flask(__name__)
    docker=os.environ.get("FLASK_ENV","docker")
    if docker is not None:
        app.config['SQLALCHEMY_DATABASE_URI']="postgresql://testuser:password@postgres/testdb"
    elif test_config!=None:
        app.config['SQLALCHEMY_DATABASE_URI']=test_config['SQLALCHEMY_DATABASE_URI']
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%s:%s@localhost:5432/snake'%(config.username,config.password)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    db.init_app(app)
    db.metadata.clear()

    from .models import User

    with app.app_context():
        db.create_all()
    from . import server
    app.register_blueprint(server.api)
    return app


create_app()
