from .shared_db import db
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	firstname = db.Column(db.String(80), unique=False, nullable=False)
	lastname= db.Column(db.String(80), unique=False, nullable=False)
	score= db.Column(db.Integer,default=0,unique=False, nullable=True)

