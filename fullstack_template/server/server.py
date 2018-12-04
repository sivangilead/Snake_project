from flask import Flask, Blueprint

api=Blueprint('api','api',url_prefix='/api')

@api.route("/")
def hello():
    return "Hello Sivan!"


