from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from modules.db_tools import UserDBTools


# configuration
DEBUG = True

# instantiate database connection.
u_tools = UserDBTools()
u_tools.local = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/createUser', methods=['GET', 'POST'])
def create_user():
    response = {'status': 'success'}
    if request.method == 'POST':
        user_data = request.get_json()
        if u_tools.create_user(user_data.get('username'),
                               user_data.get('password')):
            response['userAdded'] = 'true'
        else:
            response['userAdded'] = 'false'
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
    app.run()
