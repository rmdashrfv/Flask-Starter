from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# jwt
# bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres//mlaw:cjiaang11@localhost/flask_starter_test_db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Post(db.Model):
    pass


@app.route('/status')
def home():
    return {
        'message': 'Congratulations! Flask Starter is all set up!'
    }

@app.route('/login', methods=['POST'])
def login():
    pass


if __name__ == '__main__':
    app.run(host='localhost', port=5050)
