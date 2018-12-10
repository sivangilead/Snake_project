import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .shared_db import db


def create_app(test_config=None):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sgilead:kepler2012@localhost:5432/snake'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    db.init_app(app)
    db.metadata.clear()

    from .models import User

    with app.app_context():
#        db.drop_all()
        db.create_all()
    #class User(db.Model):
	#	id = db.Column(db.Integer, primary_key=True)
	#	firstname = db.Column(db.String(80), unique=True, nullable=False)
	#	lastname= db.Column(db.String(80), unique=True, nullable=False)

	#	def __repr__(self):
	#		return self.firstname


#
#    db.create_all()
#    user1=User(firstname='ss', lastname='ss')
#    user2=User(firstname='dd', lastname='dd')
#
#    db.session.add(user1)
#    db.session.add(user2)
#    db.session.commit()

    from . import server
    app.register_blueprint(server.api)
    return app


#



create_app()
