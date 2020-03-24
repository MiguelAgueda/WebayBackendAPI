from flask import Flask, jsonify, request, Blueprint, render_template
from flask_cors import CORS
from datetime import datetime
from modules.db_tools import UserDBTools
import requests


# configuration
DEBUG = False

# instantiate database connection.
u_tools = UserDBTools()
u_tools.local = False

# instantiate the app
app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")
# app.config.from_object(__name__)


# enable CORS
CORS(app, resources={r'/api/*': {'origins': '*'}})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

@app.route('/favicon.ico', methods=['GET'])
def get_icon():
    return

@app.route('/api/sample')
def index():
    r = requests.get('http://httpbin.org/status/418')
    print(r.text)
    return jsonify(r.text)


@app.route('/api/signup', methods=['GET', 'POST'])
def create_user():
    response={'status': 'success'}
    if request.method == 'POST':
        user_data=request.get_json()
        username = user_data['username']
        password = user_data['password']
        if u_tools._username_exists(username):
            response['valid'] = 'false'
        else:
            if u_tools.create_user(username, password):
                response['valid'] = 'true'
    return jsonify(response)


@app.route('/api/login', methods=['POST'])
def user_login():
    response={'recieved': 'true'}
    user_data=request.get_json()
    if u_tools.login_user(user_data.get('username'),
                          user_data.get('password')):
        response['valid'] = 'true'
    else:
        response['valid'] = 'false'
    return jsonify(response)



@app.route('/api/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


if __name__ == '__main__':
    app.run()
