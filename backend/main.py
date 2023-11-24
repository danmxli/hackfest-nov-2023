from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from routers.users import users_blueprint
from routers.planning import planning_blueprint
from routers.chat import chat_blueprint
from routers.loading import loading_blueprint
import time

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = Flask(__name__)

CORS(app)
app.register_blueprint(users_blueprint, url_prefix='/users')
app.register_blueprint(planning_blueprint, url_prefix='/planning')
app.register_blueprint(chat_blueprint, url_prefix='/chat')
app.register_blueprint(loading_blueprint, url_prefix='/loading')


@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message": "root route reached"})


@app.route('/dummy', methods=["GET", "POST"])
def dummy():
    time.sleep(5)
    return (jsonify({}))


if __name__ == '__main__':
    port = int(os.getenv("PORT", default=3000))
    if port is not None:
        app.run(debug=True, port=port)
    else:
        print("Error: PORT environment variable is not set or is not a valid integer.")
