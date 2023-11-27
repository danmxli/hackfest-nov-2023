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

"""
prompt_quickstart empty resource_list
prompt_developer populate resource_list
prompt_academia populate resource_list
call to base method subtracts 8 tokens for quickstart, 12 for developer or academia
"""


@loading_blueprint.route('/base', methods=["POST"])
def create_base():
    ...
    data = request.get_json()
    email = data.get("email")
    prompt = data.get("prompt")
    prompt_type = data.get("prompt_type")

    if prompt_type == "prompt_quickstart":
        tokens_to_subtract = 8
    elif prompt_type == "prompt_developer" or prompt_type == "prompt_academia":
        tokens_to_subtract = 12
    else:
        tokens_to_subtract = 0

    user = UserInfo.find_one({"email": email})
    if user:
        # check for enough tokens
        if user["tokens"] - tokens_to_subtract < 0:
            ...
            return (jsonify({
                "email": email,
                "message": "not enough tokens"
            }))

        base = base_plan(prompt, prompt_type)

        # subtract from tokens
        subtractToken = {
            "$inc": {"tokens": -int(tokens_to_subtract)}
        }
        UserInfo.update_one(
            {"email": email},
            subtractToken)

        # update token_history with logs
        token_log = {
            "time_called": str(datetime.datetime.now()),
            "type": "Generate base plan",
            "details": f"Created base plan of type {prompt_type} for prompt: \"{prompt}\"",
            "tokens_used": tokens_to_subtract
        }
        updateTokenHistory = {
            "$push": {'token_history': token_log}
        }
        UserInfo.update_one(
            {
                "email": email
            }, updateTokenHistory)

        # obtain updated tokens
        rem_tokens = 0
        updated_info = UserInfo.find_one({"email": email})
        if updated_info is not None:
            rem_tokens = updated_info["tokens"]
            return jsonify({
                "email": email,
                "tokens": rem_tokens,
                "description": prompt,
                "prompt_type": prompt_type,
                "raw_text": base["raw"],
                "base_tasks": base["task_list"],
                "resources": base["resource_list"],
                "message": "created successfully"
            })

        else:
            return (jsonify({"email": email, "message": "error finding document"}))

    return (jsonify({
        "message": "user not found"
    }))
