# Functions for hashing password referenced from:
#     https://docs.python.org/3/library/hashlib.html

import os
from hashlib import pbkdf2_hmac
from datetime import datetime
from pymongo import MongoClient


class BaseDBTools(object):
    """
    This module handles connecting to a local or remote database.

    Available Attributes:
    - local : Set to 'False' to connect to cloud database. Defaults to local database.
    """

    def __init__(self):
        self.local = True
        self.client = MongoClient()

    @property
    def local(self):
        """Return object's `local` variable."""
        return self.local

    @local.setter
    def local(self, local):
        """
        Connect to Webay database on MongoDB cloud.

        Assumes that username and password are stored as environment variables
        WEBAY_DB_USER and WEBAY_DB_PASS, respectively.
        This avoids the exposure of secret keys via push to GitHub.
        """
        if not local:
            # Get DB username from environment var.
            db_user = os.environ.get('WEBAY_DB_USER')
            # Get DB password from environment var.
            db_pass = os.environ.get('WEBAY_DB_PASS')
            assert db_user.len() > 0, "DB-Username not defined in environment."
            assert db_pass.len() > 0, "DB-Password not defined in environment."
            conn_str = F'mongodb+srv://{db_user}:{db_pass}@forumdb-wmmkf.mongodb.net/test?retryWrites=true&w=majority'
            self.client = MongoClient(
                conn_str, connectTimeoutMS=5000, connect=True)


class UserDBTools(BaseDBTools):
    """
    This module provides CRUD operators for the `users` database. 

    Note:
        To connect to live database, set instance's 'local' attribute to False.
        (UserDBTools Instance).local = False`

    Available Functions:
        - create_user: Creates user with unique username.
        - read_user: Returns the '_id' object of user with 'username'.
        - update_user: Updates existing user's username and/or password.
        - all_users: Returns a list of currently in-use usernames.
        - delete_user: Deletes existing user.
    """

    def __init__(self):
        super().__init__()
        self.key = os.environ.get('WEBAY_CRYPT_KEY')

    def _hash_pass(self, no_crypt_password, salt=os.urandom(64)):
        """Hash `no_crypt_password` using one-way hashing algorithm."""
        hash_name = "sha256"
        password = salt + no_crypt_password.encode('utf-8')
        iterations = 100000
        dk_len = 128

        dk = pbkdf2_hmac(hash_name, password, salt, iterations, dk_len)
        hashed_pass = dk.hex()
        return hashed_pass, salt

    def _username_exists(self, username):
        """Returns status of existing username."""
        if self.client.db.users.find_one({"username": username}):
            return True
        else:
            return False

    def create_user(self, username, password):
        """
        Add new user to 'users' collection of forum database.

        Parameters:
            - username: String containing new user's username.
            - password: String containing new user's password. 

        Return Value:
            - True: Creating new user was successful.
            - False: Creating new user was not successful.
        """
        if not self._username_exists(username):
            hash_to_store, salt_used = self._hash_pass(password)
            # print(type(self.client.db))
            self.client.db.users.insert_one({"username": username,
                                             "hash": hash_to_store,
                                             "salt": salt_used,
                                             "date": datetime.utcnow(),
                                             })
            return True
        else:
            return False

    def login_user(self, username, password):
        """Validate user login attempt."""
        if self._username_exists(username):
            print("Username Exists!")
            user_secrets = self.client.db.users.find_one({"username": username},
                                                         {"_id": 0, "hash": 1, "salt": 1})
            user_hash = user_secrets["hash"]
            print(F"User Hash: {user_hash}")
            uncertain_hash, _ = self._hash_pass(password, salt=user_secrets["salt"])
            print(F"Uncertain Hash: {uncertain_hash}")
            if uncertain_hash == user_secrets["hash"]:
                return True
        return False

    def read_user(self, username):
        """
        Returns `_id` object of user with username `username`.

        Parameters:
            - username: Username to search.

        Return Value:
            - '_id' Object: '_id' value of found username.
            - None: Username not found among users.
        """
        user = self.client.db.users.find_one({"username": username})
        if not user:
            return None
        user__id = user["_id"]
        return user__id

    def all_users(self):
        """Return set of all usernames."""
        return_list = []
        for post in self.client.db.users.find({"username": {"$exists": "true"}}, {"_id": 0, "username": 1}):
            return_list.append(post["username"])
        return return_list

    def update_user(self, user__id, new_user=None, new_pass=None):
        """
        Update an existing user's username and/or password.

        Parameters:
            - user__id: Existing user's '_id' value.
            - (opt) new_user: New username to update.
            - (opt) new_pass: New password to update.

        Return Values:
            - True: User update was successful.
            - False: User update was not successful.
        """
        if not user__id:
            return False

        updated_doc = {}
        if new_user and not self._username_exists(new_user):
            updated_doc["username"] = new_user
        if new_pass:
            new_hash, new_salt = self._hash_pass(new_pass)
            updated_doc["hash"] = new_hash
            updated_doc["salt"] = new_salt

        self.client.db.users.update_one({"_id": user__id},
                                        {"$set": updated_doc})
        return True

    def delete_user(self, user__id):
        """
        Delete an existing user.

        Parameters:
            - user__id: '_id' value for user-to-delete.

        Return Value:
            - True: User deletion was successful.
            - False: User deletion was not successful.
        """
        if not user__id:  # Check if user__id is valid.
            return False

        result = self.client.db.users.delete_one({"_id": user__id})
        if result.deleted_count == 0:
            return False

        return True


class ForumDBTools(BaseDBTools):
    """
    This module provides CUD operators for the `forum` database.

    Note:
        To connect to live database, set instance's 'local' attribute to False.
        (ForumDBTools Instance).local = False`

    Available Functions:
    - create_post: Creates a new post, returns '_id' object of new post.
    - update_post: Updates an existing post with new content and/or title.
    - delete_post: Deletes an existing post. 
    """

    def __init__(self):
        super().__init__()

    def create_post(self, author__id, content, title=None, parent__id=None):
        """
        Create a new forum post. 

        Parameters:
            - author__id: '_id' object of author.
            - content: String object of post's content.
            - (opt) title: String object of a root-post title.
            - (opt) parent__id: '_id' object of a response-post's parent.

        Return Value:
            - '_id' object of newly created post.
        """
        post = {}
        if parent__id:
            if title:
                raise AttributeError("Response post should not have a title.")
            post = self._response(parent__id, author__id, content)

        elif title:
            if parent__id:
                raise AttributeError("Root post should not have a parent.")
            post = self._root(author__id, title, content)

        else:
            raise AttributeError("Post must be root or response.")

        result = self.client.db.forum.insert_one(post)
        return result.inserted_id

    def _root(self, author__id, title, content):
        """Helper function for creating root-posts."""
        auth_username = self.client.db.users.find_one({"_id": author__id},
                                                      {"_id": 0, "username": 1})
        post = {
            "author__id": author__id,
            "author": auth_username,
            "date": datetime.now(),
            "title": title,
            "content": content,
        }
        return post

    def _response(self, parent__id, author__id, content):
        """Helper function for creating response-posts."""
        auth_username = self.client.db.users.find_one({"_id": author__id},
                                                      {"_id": 0, "username": 1})
        post = {
            "parent__id": parent__id,
            "author__id": author__id,
            "author": auth_username,
            "date": datetime.now(),
            "content": content,
        }
        return post

    def update_post(self, post__id, title=None, content=None):
        """
        Update an existing post's title and/or content.

        Parameters:
            - post__id: '_id' object of post-to-update.
            - (opt) title: Update a root-post's title.
            - (opt) content: Update a root- or response-post's content.

        Return Value:
            - True: Update was successful.
            - False: Update was not successful.
        """
        post = self.client.db.forum.find_one({"_id": post__id})
        if title:
            post["title"] = title
        if content:
            post["content"] = content
        result = self.client.db.forum.update_one(
            {"_id": post__id}, {"$set": post})
        if result.matched_count == 0:
            return False
        else:
            return True

    def delete_post(self, post__id):
        """
        Delete an existing post. 

        Parameters:
            - post__id: '_id' object of post-to-delete.

        Return Values:
            - True: Delete was successful.
            - False: Delete was not sucessful.
        """
        result = self.client.db.forum.delete_one({"_id": post__id})
        if result.deleted_count != 1:
            return False
        return True
