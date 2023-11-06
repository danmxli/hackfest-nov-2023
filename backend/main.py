from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from routers.users import users_blueprint
import time

load_dotenv('.env')
client = MongoClient(os.getenv("MONGODB_URI"))
db = client['AppData']
app = Flask(__name__)

CORS(app)
app.register_blueprint(users_blueprint, url_prefix='/users')

@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message": "root route reached"})


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=3000))
