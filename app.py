from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return {'message': 'Congratulations! Flask Starter is all set up!'}

