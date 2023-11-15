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


@users_blueprint.route('/', methods=["POST"])
def find():
    # return username and list of dict plan _id, description
    history = []
    data = request.get_json()
    email = data.get("email")
    match = UserInfo.find_one({"email": email})
    if match:
        all_plans = match.get("plans", [])
        for plan in all_plans:
            history.append({
                "_id": plan["_id"],
                "description": plan["description"]
            })
        return (jsonify({
            "username": match["name"],
            "history": history
        }))
    else:
        return (jsonify({"username": "not found"}))


@users_blueprint.route('/signup', methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # find existing user
    match = UserInfo.find_one({"username": username})
    if match:
        return (jsonify({"username": "existing found"}))

    # insert new user doc
    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "username": username,
        "password": encrypt_password(password),
        "plans": []
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return (doc)
    else:
        return (jsonify({"username": "error"}))


@users_blueprint.route('/signin', methods=["POST"])
def signin():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # find one by username
    user = UserInfo.find_one({"username": username})
    if not user:
        return (jsonify({"username": "not found"}))

    # compare password from request to decrypted password
    if password == decrypt_password(user["password"]):
        return (user)
    else:
        return (jsonify({"username": "not found"}))


@users_blueprint.route('/access', methods=["POST"])
def access():
    # auth0 frontend
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    # find a user document
    if UserInfo.count_documents({}) > 0:
        match = UserInfo.find_one({"name": name, "email": email})
        if match:
            return (jsonify(match))

    # if not found, create new document
    doc = {
        "_id": str(uuid4()),
        "time_created": int(datetime.datetime.now().timestamp()),
        "name": name,
        "email": email,
        "plans": []
    }
    result = UserInfo.insert_one(doc)

    if result.inserted_id:
        return (doc)
    else:
        return (jsonify({"username": "not found"}))
