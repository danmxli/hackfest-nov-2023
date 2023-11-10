from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request
from data.generate import generate_subtask

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

chat_blueprint = Blueprint('chat', __name__)


@chat_blueprint.route("/subtask", methods=["POST"])
def create_subtask():
    data = request.get_json()
    userId = data.get("userId")
    prompt = data.get("prompt")
    response = ''

    user = UserInfo.find_one({"_id": userId})
    if user:
        response = generate_subtask(prompt)
        return (jsonify({
            "_id": userId,
            "message": response
        }))
    else:
        return (jsonify({
            "_id": userId,
            "message": "not found"
        }))
