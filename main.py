from flask import Flask, jsonify, request, Blueprint, render_template, send_file
from flask_cors import CORS
from datetime import datetime
from modules.db_tools import UserDBTools, ForumDBTools
import requests


# configuration
DEBUG = False

# instantiate database connection.
u_tools = UserDBTools()
u_tools.local = False
f_tools = ForumDBTools()
f_tools.local = False

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

# @app.route('/favicon.ico', methods=['GET'])
# def get_icon():
#     return send_file('dist/static/assets/logo.png', mimetype='image/png')


@app.route('/api/signup', methods=['GET', 'POST'])
def create_user():
    response = {'status': 'success'}
    if request.method == 'POST':
        user_data = request.get_json()
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
    response = {'recieved': 'true'}
    user_data = request.get_json()
    if u_tools.login_user(user_data.get('username'),
                          user_data.get('password')):
        response['valid'] = 'true'
    else:
        response['valid'] = 'false'
    return jsonify(response)


@app.route('/api/listings', methods=['GET'])
# def get_listings():
@app.route('/api/forum/get_posts', methods=['GET'])
def get_posts():
    response = []
    posts = f_tools.read_posts()
    # for post in posts:
    #     post['_id'] = str(post['_id'])
    #     # response.append(post)
    # # return (jsonify(response))
    return jsonify(list(posts))
    # return (jsonify({"_id": "5e752676e3f3f325e88f96fe", "content": "This is the content of a root post. This post should not have a parent__id attribute.", "title": "A Root Post"}))


@app.route('/api/forum/get_post', methods=['POST'])
def get_post():
    data = request.get_json()
    print(F"The Data: {data}")
    post = f_tools.read_post(data['op_id'])
    return jsonify(post)


@app.route('/api/forum/create_parent', methods=['POST'])
def create_parent():
    parent_data = request.get_json()
    author_id = u_tools.read_user(parent_data['username'])
    f_tools.create_post(author_id, parent_data['content'],
                        title=parent_data['title'])
    return ''


@app.route('/api/forum/create_child', methods=['POST'])
def create_child():
    child_data = request.get_json()
    author_id = u_tools.read_user(child_data['username'])
    f_tools.create_post(author_id, child_data['content'],
                        parent__id=child_data['op_id'])
    return ''


@app.route('/api/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


if __name__ == '__main__':
    app.run()
