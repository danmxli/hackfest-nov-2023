from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
import datetime
from flask import Blueprint, jsonify, request
from data.encryption import encrypt_password, decrypt_password

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

users_blueprint = Blueprint('users', __name__)


@users_blueprint.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # find existing user
    match = UserInfo.find_one({"username": username})
    if match:
        return (jsonify({"username": "existing"}))

    # insert new user doc
    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "username": username,
        "password": encrypt_password(password),
        "plans": {}
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return (doc)


@users_blueprint.route('/signin', methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # find one by username
    user = UserInfo.find_one({"username": username})
    if not user:
        return (jsonify({"username": "not_found"}))

    # compare password from request to decrypted password 
    if password == decrypt_password(user["password"]):
        return(user)
    else:
        return (jsonify({"username": "not_found"}))

