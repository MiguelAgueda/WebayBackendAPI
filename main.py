from flask import Flask, jsonify, request, Blueprint, render_template, send_file
from flask_cors import CORS
from datetime import datetime
from modules.db_tools import UserDBTools, ForumDBTools, ListingDBTools
import requests


# configuration
DEBUG = False

# instantiate database connection.
u_tools = UserDBTools()
u_tools.local = False
f_tools = ForumDBTools()
f_tools.local = False
l_tools = ListingDBTools()
l_tools.local = False

# instantiate the app
app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")

# enable CORS
CORS(app, resources={r'/api/*': {'origins': '*'}})


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")


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


@app.route('/api/listings/get_listings', methods=['GET'])
def get_listings():
    print("Getting Listings. Debugging!")
    listings = l_tools.read_listing()  # No parameter returns all listings.
    print(F"Listings: {listings}")
    return jsonify(listings)


@app.route('/api/listings/get_listing', methods=['POST'])
def get_listing():
    data = request.get_json()
    print(F"data: {data}")
    listing = l_tools.read_listing(_id=data["id"])
    return jsonify(listing)


@app.route('/api/listings/create_listing', methods=['POST'])
def create_listing():
    data = request.get_json()
    print(F"Data from request: {data}")
    l_tools.create_listing(
        data["title"], data["description"], data["condition"], data["price"])
    return ''


@app.route('/api/listings/edit_listing', methods=['POST'])
def edit_listing():
    data = request.get_json()
    l_tools.update_listing(
        data["_id"], data["title"], data["description"], data["condition"], data["price"])
    return ''


@app.route('/api/listings/delete_listing', methods=['POST'])
def delete_listing():
    data = request.get_json()
    l_tools.delete_listing(data["_id"])
    return ''


@app.route('/api/forum/get_posts', methods=['GET'])
def get_posts():
    posts = f_tools.read_posts()
    return jsonify(list(posts))


@app.route('/api/forum/get_post', methods=['POST'])
def get_post():
    data = request.get_json()
    # print(F"The Data: {data}")
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
