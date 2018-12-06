import os

from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)

    from . import server
    app.register_blueprint(server.api)

    return app



