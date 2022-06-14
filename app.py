from flask import Flask, request
from os import environ
from flask_sqlalchemy import SQLAlchemy
import bcrypt
import jwt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://mlaw:cjiaang11@localhost/flask_starter_test_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def __init__(self, content):
        self.content = content


# db.engine.table_names is deprecated
if 'users' not in db.engine.table_names():
    db.create_all()

@app.route('/status')
def home():
    return {
      'message': 'Congratulations! Flask Starter is all set up!'
    }


@app.route('/signup', methods=['POST'])
def signup():
    data = request.form
    user = User(data['name'], data['email'], data['password'])
    # encrypt password here
    db.session.add(user)
    db.session.commit()
    return {
      'message': 'Signup complete!'
    }


@app.route('/login', methods=['POST'])
def login():
    given_email = request.form.get('email')
    given_password = request.form.get('password')
    user = User.query.filter_by(email=given_email).first()
    if user and given_password == user.password:
        return {
            'user': {
               'email': user.email,
               'name': user.name 
            }
        }
    else:
        return {
            'error': 'Invalid email or password'
        }


@app.route('/users/<int:user_id>')
def profile(user_id):
    user = User.query.get(user_id)
    if user:
        return {
          'email': user.email,
          'name': user.name
        }
    else:
        return {
          'error': 'No user found'
        }


@app.route('/posts')
def posts():
    pass


if __name__ == '__main__':
    app.run(host='localhost', port=environ.get('PORT', 5050))
