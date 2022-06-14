from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres//mlaw:cjiaang11@localhost/flask_starter_test_db'
db = SQLAlchemy(app)

app = Flask(__name__)

@app.route('/')
def home():
    return {'message': 'Congratulations! Flask Starter is all set up!'}

