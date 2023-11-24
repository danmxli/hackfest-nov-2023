from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request
from data.generate import base_plan
import datetime

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

loading_blueprint = Blueprint('loading', __name__)

@loading_blueprint.route('/base', methods=["POST"])
def create_base():
    ...
    data = request.get_json()
    email = data.get("email")
    prompt = data.get("prompt")
    prompt_type = data.get("prompt_type")
    user = UserInfo.find_one({"email": email})
    if user:
        base = base_plan(prompt, prompt_type)        

        return jsonify({
            "description": prompt,
            "prompt_type": prompt_type,
            "raw_text": base["raw"],
            "base_tasks": base["task_list"],
            "resources": base["resource_list"],
            "status": "created successfully"
        })
    
    return(jsonify({
        "status": "user not found"
    }))