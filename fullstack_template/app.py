import os
from flask import Flask

from server.server import api

app=Flask(__name__)
app.register_blueprint(api)

