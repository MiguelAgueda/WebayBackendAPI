from flask import Flask, jsonify, request, Blueprint, render_template
from flask_cors import CORS
from datetime import datetime
from modules.db_tools import UserDBTools


# configuration
DEBUG = True

# instantiate database connection.
u_tools = UserDBTools()
u_tools.local = True

# instantiate the app
app = Flask(__name__, static_folder='/static')
app.config.from_object(__name__)


# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/sample')
def sample():
    try:
        return render_template('index.html')
    except TemplateNotFound:
        return jsonify("Template Not Found!")

@app.route('/signup', methods=['GET', 'POST'])
def create_user():
    response = {'status': 'success'}
    if request.method == 'POST':
        user_data = request.get_json()
    return jsonify(response)

@app.route('/login', methods=['POST'])
def user_login():
    response = {'recieved': 'true'}
    user_data = request.get_json()
    if u_tools.login_user(user_data.get('username'),
                          user_data.get('password')):
        response['valid'] = 'true'
    else:
        response['valid'] = 'false'
    return jsonify(response)

@app.route('/dbTest', methods=['GET'])
def db_test():
    date = datetime.now()
    returner = {"data": "Wow"}
    # return jsonify("WOW")
    # return jsonify(returner)
    return jsonify(date)

@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


if __name__ == '__main__':
    app.run(port=8080, debug=True)
