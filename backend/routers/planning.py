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
    base_id = ''
    data = request.get_json()
    userId = data.get("userId")
    prompt = data.get("prompt")

    user = UserInfo.find_one({"_id": userId})
    if user:
        base = base_plan(prompt)
        # create dict to store the new plan
        base_id = str(uuid4())
        newPlan = {
            "_id": base_id,
            "description": prompt,
            "base_tasks": base
        }
        updateBasePlan = {
            "$push": {"plans": newPlan}
        }
        UserInfo.update_one(user, updateBasePlan)

        # get updated plan history
        history = []
        target_user = UserInfo.find_one({"_id": userId})
        if target_user is None:
            return (jsonify({"userId": "not found"}))
        
        all_plans = target_user.get("plans", [])
        for plan in all_plans:
            history.append({
                "_id": plan["_id"],
                "description": plan["description"]
            })

        return (jsonify({
            "userId": userId,
            "base_plan": base,
            "base_id": base_id,
            "history": history
        }))

    else:
        return (jsonify({"userId": "not found"}))


"""
for "action": "add" specify "subtask": "example string"
for "action": "remove" specify "subtaskId": "example-id-21331"
"""


@planning_blueprint.route('/edit_subtask', methods=["POST"])
def edit_subtask():
    # endpoint to add or remove a subtask to a base task
    subtaskId = ""
    data = request.get_json()
    # base request args
    userId = data.get("userId")
    planId = data.get('planId')
    taskDescription = data.get('taskDescription')
    action = data.get("action")

    user = UserInfo.find_one({"_id": userId})
    if user:
        all_plans = user.get("plans", [])

        # find matching plan for planId
        res = next((plan for plan in all_plans if plan['_id'] == planId), None)
        if res is None:
            return (jsonify({
                "userId": userId,
                "message": "not found"
            }))

        # find matching base task
        base_task = next(
            (task for task in res["base_tasks"] if task["description"] == taskDescription))
        if base_task is None:
            return (jsonify({
                "userId": userId,
                "message": "not found"
            }))

        # filter to identify the document
        filter = {
            "_id": userId,
            "plans._id": planId,
            "plans.base_tasks.description": taskDescription
        }
        # Array filter to identify the specific base_task
        array_filters = [
            {"plan._id": planId},
            {"task.description": taskDescription}
        ]

        # action to add subtask
        if action == 'add':
            subtask = data.get('subtask')
            subtaskId = str(uuid4())

            addSubtask = {
                "$push": {
                    "plans.$[plan].base_tasks.$[task].sub_tasks": {
                        "_id": subtaskId,
                        "description": subtask
                    }
                }
            }

            # update_one
            result = UserInfo.update_one(
                filter, addSubtask, array_filters=array_filters)
            if result.modified_count > 0:
                return (jsonify({
                    "userId": userId,
                    "message": "successfully inserted",
                    "subtaskId": subtaskId
                }))
            else:
                return (jsonify({
                    "userId": userId,
                    "message": "error updating"
                }))

        # action to remove subtask by subtaskId
        elif action == 'remove':
            subtaskId = data.get("subtaskId")

            removeSubtask = {
                "$pull": {
                    "plans.$[plan].base_tasks.$[task].sub_tasks": {
                        "_id": subtaskId,
                    }
                }
            }
            # update_one
            result = UserInfo.update_one(
                filter, removeSubtask, array_filters=array_filters)
            
            if result.modified_count > 0:
                # get updated subtasks
                updated_user = UserInfo.find_one({"_id": userId})
                if updated_user is None:
                    return (jsonify({"userId": "not found"}))

                updated_plans = updated_user.get("plans", [])
                target_plan = next(
                    (plan for plan in updated_plans if plan['_id'] == planId))
                updated_base_task = next(
                    (task for task in target_plan["base_tasks"] if task["description"] == taskDescription))

                return (jsonify({
                    "userId": userId,
                    "message": "successfully removed",
                    "subtaskId": subtaskId,
                    "subtasks": updated_base_task['sub_tasks']
                }))
            else:
                return (jsonify({
                    "userId": userId,
                    "message": "error updating"
                }))

        else:
            return (jsonify({
                    "userId": userId,
                    "message": "unknown action"
                    }))

    return (jsonify({
                    "userId": userId,
                    "message": "user not found"
                    }))


@planning_blueprint.route("/all_subtasks", methods=["POST"])
def all_subtasks():
    # endpoint to retrieve all subtask as a list
    data = request.get_json()
    userId = data.get("userId")
    planId = data.get("planId")
    taskDescription = data.get('taskDescription')

    user = UserInfo.find_one({"_id": userId})
    if user:
        all_plans = user.get("plans", [])

        # find matching plan for planId
        res = next((plan for plan in all_plans if plan['_id'] == planId), None)
        if res is None:
            return (jsonify({
                "userId": userId,
                "message": "not found"
            }))
        base = next(
            (item for item in res['base_tasks'] if item['description'] == taskDescription), None)
        if base is None:
            return (jsonify({
                "userId": userId,
                "message": "base task not found"
            }))

        return (jsonify({
                "userId": userId,
                "message": "subtasks retrieved",
                "subtasks": base["sub_tasks"]
                }))
    else:
        return (jsonify({
            "userId": userId,
            "message": "user not found"
        }))


@planning_blueprint.route('/load_one', methods=["POST"])
def load_one():
    # endpoint to get base_plan details for userId and plan _id
    data = request.get_json()
    userId = data.get("userId")
    planId = data.get("planId")

    user = UserInfo.find_one({"_id": userId})
    if user:
        all_plans = user.get("plans", [])

        # find matching plan for planId
        res = next((plan for plan in all_plans if plan['_id'] == planId), None)
        if res is None:
            return (jsonify({
                "userId": userId,
                "match": "not found"
            }))
        return (jsonify({
            "userId": userId,
            "match": res
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

        # get updated plan history
        history = []
        target_user = UserInfo.find_one({"_id": userId})
        if target_user is None:
            return (jsonify({"userId": "not found"}))
        
        all_plans = target_user.get("plans", [])
        for plan in all_plans:
            history.append({
                "_id": plan["_id"],
                "description": plan["description"]
            })

        return (jsonify({
            "userId": userId,
            "message": "Successfully cleared all plans.",
            "history": history

        }))

    else:
        return (jsonify({"userId": "not found"}))
