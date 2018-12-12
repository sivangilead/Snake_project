import pytest
from server import create_app
from server.shared_db import db as _db
from sqlalchemy.schema import MetaData
import os
import json
from server.config import *

TESTDB = 'test_project'
TEST_DATABASE_URI = 'postgresql://%s:%s@localhost:5432/test_project'%(username,password)

@pytest.fixture(scope='session')
def app(request):
    print("inside app")
    """Session-wide test `Flask` application."""
    test_config = {
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': TEST_DATABASE_URI
    }
    app = create_app(test_config)
    # Establish an application context before running the tests.
    ctx = app.app_context()
    ctx.push()

    def teardown():
        ctx.pop()

    request.addfinalizer(teardown)
    return app


@pytest.fixture(scope='session')
def db(app, request):
    """
    Returns session-wide initialised database.
    """
    print("inside db")
    with app.app_context():
        _db.drop_all()
        db=_db
        class User(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            firstname = db.Column(db.String(80), unique=False, nullable=False)
            lastname= db.Column(db.String(80), unique=False, nullable=False)
            score= db.Column(db.Integer,default=0,unique=False, nullable=True)

        _db.create_all()

    return _db



@pytest.fixture(scope='function')
def session(db, request):
    print("inside session")
    """Creates a new database session for a test."""
    connection = db.engine.connect()
    transaction = connection.begin()

    options = dict(bind=connection, binds={})
    session = db.create_scoped_session(options=options)

    db.session = session

    def teardown():
        print("teardown")
        truncate_db(db, session)
        transaction.rollback()
        connection.close()
        session.remove()

    request.addfinalizer(teardown)
    return session

def truncate_db(db, session):
    # delete all table data (but keep tables)
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print("Truncating table ", table)
        session.execute(table.delete())
    session.commit()

def test_user(app,session):
    with app.test_client() as client:
        response=client.post('http://localhost:5000/api/',data=json.dumps(dict(firstname='Tal',lastname='Spiegel')),content_type='application/json')

    assert response.status_code == 201
    assert json.loads(response.data) == ['Tal','Spiegel']

def test_score(app,session):
    with app.test_client() as client:
        client.post('http://localhost:5000/api/',data=json.dumps(dict(firstname='Tal',lastname='Spiegel')),content_type='application/json')
        response=client.post('http://localhost:5000/api/score',data=json.dumps(dict(firstname='Tal',lastname='Spiegel',score=1)),content_type='application/json')

    assert response.status_code == 201
    assert json.loads(response.data) == 1
    with app.test_client() as client:
        get_score=client.get('http://localhost:5000/api/score/?firstname=Tal&lastname=Spiegel')
    assert get_score.status_code == 200
    assert json.loads(get_score.data) == [1]


def test_topscores(app,session):
    with app.test_client() as client:
        client.post('http://localhost:5000/api/',data=json.dumps(dict(firstname='Tal', lastname ='Spiegel')),content_type='application/json')
        client.post('http://localhost:5000/api/',data=json.dumps(dict(firstname='Sivan', lastname ='Gilead')),content_type='application/json')
        client.post('http://localhost:5000/api/score',data=json.dumps(dict(firstname='Tal',lastname='Spiegel',score=1)),content_type='application/json')
        client.post('http://localhost:5000/api/score',data=json.dumps(dict(firstname='Sivan',lastname='Gilead',score=2)),content_type='application/json')
        response=client.get('http://localhost:5000/api/score/topScores')
    assert response.status_code == 200
    assert json.loads(response.data)==[{'firstname':'Sivan','lastname':'Gilead', 'score':2}, {'firstname':'Tal','lastname':'Spiegel','score': 1}]





