from crypt import methods
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request
from data.generate import base_chat_generate
import datetime

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

chat_blueprint = Blueprint('chat', __name__)


@chat_blueprint.route("/", methods=["POST"])
def create_subtask():
    data = request.get_json()
    email = data.get("email")
    planId = data.get('planId')
    taskDescription = data.get('taskDescription')
    prompt = data.get("prompt")
    response = ''

    user = UserInfo.find_one({"email": email})
    if user:

        # return not enough tokens status
        if user['tokens'] - 1 < 0:
            return (jsonify({
                "email": email,
                "status": "not enough tokens"
            }))
        all_plans = user.get("plans", [])

        # find matching plan for planId
        res = next((plan for plan in all_plans if plan['_id'] == planId), None)
        if res is None:
            return (jsonify({
                "email": email,
                "chat_logs": "not found",
                "status": "chat logs not found"
            }))

        # find matching base task
        base_task = next(
            (task for task in res["base_tasks"] if task["description"] == taskDescription))
        if base_task is None:
            return (jsonify({
                "email": email,
                "chat_logs": "not found",
                "status": "chat logs not found"
            }))

        # filter to identify the document
        filter = {
            "email": email,
            "plans._id": planId,
            "plans.base_tasks.description": taskDescription
        }
        # Array filter to identify the specific base_task
        array_filters = [
            {"plan._id": planId},
            {"task.description": taskDescription}
        ]

        response = base_chat_generate(prompt, taskDescription)

        updateChatHistory = {
            "$push": {
                "plans.$[plan].base_tasks.$[task].chat_history": {
                    "$each": [
                        {
                            "role": "user",
                            "message": prompt
                        },
                        {
                            "role": "bot",
                            "message": response
                        }
                    ]
                }
            }
        }

        result = UserInfo.update_one(
            filter, updateChatHistory, array_filters=array_filters)
        if result:

            # subtract from tokens
            subtractToken = {
                "$inc": {"tokens": -1}
            }
            UserInfo.update_one(
                {"email": email},
                subtractToken)

            # update token_history with logs
            token_log = {
                "time_called": str(datetime.datetime.now()),
                "type": "Generate chat response",
                "details": f"Generated chat response for prompt: \"{prompt}\"",
                "tokens_used": 1
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
                return (jsonify({
                    "email": email,
                    "chat_logs": [
                        {
                            "role": "user",
                            "message": prompt
                        },
                        {
                            "role": "bot",
                            "message": response
                        }
                    ],
                    "tokens": rem_tokens,
                    "status": "successfully updated chat logs"
                }))
            else:
                return (jsonify({"email": email, "status": "error finding document"}))

        else:
            return (jsonify({
                "email": email,
                "chat_logs": "error updating one",
                "status": "error updating document"
            }))
    else:
        return (jsonify({
            "email": email,
            "chat_logs": "not found",
            "status": "user not found"
        }))


"""
view action: return chat_history list
clear action: set chat_history list to []    
"""


@chat_blueprint.route("/history", methods=["POST"])
def chat_history():
    data = request.get_json()
    email = data.get("email")
    planId = data.get('planId')
    taskDescription = data.get('taskDescription')
    action = data.get('action')

    user = UserInfo.find_one({"email": email})
    if user:
        all_plans = user.get("plans", [])

        # find matching plan for planId
        res = next((plan for plan in all_plans if plan['_id'] == planId), None)
        if res is None:
            return (jsonify({
                "email": email,
                "history": "not found"
            }))

        # find matching base task
        base_task = next(
            (task for task in res["base_tasks"] if task["description"] == taskDescription))
        if base_task is None:
            return (jsonify({
                "email": email,
                "history": "not found"
            }))

        if action == "view":
            # return chat_history list
            return (jsonify({
                "email": email,
                "history": base_task["chat_history"]
            }))
        elif action == "clear":
            ...
            # filter to identify the document
            filter = {
                "email": email,
                "plans._id": planId,
                "plans.base_tasks.description": taskDescription
            }
            # Array filter to identify the specific base_task
            array_filters = [
                {"plan._id": planId},
                {"task.description": taskDescription}
            ]

            clearChatHistory = {
                "$set": {
                    "plans.$[plan].base_tasks.$[task].chat_history": []
                }
            }

            result = UserInfo.update_one(
                filter, clearChatHistory, array_filters=array_filters)
            return (jsonify({
                "email": email,
                "history": []
            }))

        else:
            return (jsonify({
                "email": email,
                "history": "unknown action"
            }))

    return jsonify({
        "email": email,
        "history": "not found"
    })
