from flask import Flask, Blueprint, request, jsonify
from .shared_db import db
from .models import User
import json

api=Blueprint('api','api',url_prefix='/api')


@api.route("/", methods=["POST"])
def update_user():
    data = request.get_json()
    first_name=data["firstname"]
    last_name=data["lastname"]
    exists = db.session.query(User.id).filter_by(firstname=first_name,lastname=last_name).scalar()
    if exists==None:
        user1=User(firstname=first_name, lastname=last_name)
        db.session.add(user1)
        db.session.commit()
        newuser = db.session.query(User.firstname,User.lastname).filter_by(firstname=first_name,lastname=last_name).first()
        return json.dumps(newuser)
    else:
        my_user = db.session.query(User.firstname,User.lastname).filter(User.id==exists).first()
        return json.dumps(my_user)

@api.route("/score",methods=["POST"])
def update_score():
    data=request.get_json()
    score=data["score"]
    first_name=data["firstname"]
    last_name=data["lastname"]
    newuser = User.query.filter_by(firstname=first_name,lastname=last_name).first()
    if newuser.score == None or newuser.score<score:
        newuser.score=score
        db.session.commit()
        return 'update score'
    else:
        return 'lower score'

@api.route("/score/",methods=["GET"])
def get_score():
    first_name=request.args.get('firstname')
    last_name= request.args.get('lastname')
    top_score = db.session.query(User.score).filter_by(firstname=first_name,lastname=last_name).first()
    return json.dumps(top_score)




