from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from uuid import uuid4
from flask import Blueprint, jsonify, request
from data.generate import base_plan

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
UserInfo = db['UserInfo']

planning_blueprint = Blueprint('planning', __name__)


@planning_blueprint.route('/base', methods=["POST"])
def create_base():
    data = request.get_json()
    userId = data.get("userId")
    prompt = data.get("prompt")

    user = UserInfo.find_one({"_id": userId})
    if user:
        base = base_plan(prompt)
        # create dict to store the new plan
        newPlan = {
            "_id": str(uuid4()),
            "description": "testing",
            "base_tasks": base
        }
        updateBasePlan = {
            "$push": {"plans": newPlan}
        }
        UserInfo.update_one(user, updateBasePlan)

        return (jsonify({
            "userId": userId,
            "base_plan": base
        }))

    else:
        return (jsonify({"userId": "not found"}))


@planning_blueprint.route('/clear', methods=['POST'])
def clear_all():
    data = request.get_json()
    userId = data.get("userId")

    user = UserInfo.find_one({"_id": userId})
    if user:
        clearPlans = {
            "$set": {"plans": []}
        }
        UserInfo.update_one(user, clearPlans)
        return (jsonify({
            "userId": userId,
            "message": "Successfully cleared all plans."
        }))

    else:
        return (jsonify({"userId": "not found"}))
