from flask import Flask, request, jsonify
from flask_cors import CORS
from dal.dalSql import create_connection
from helpers.jwtFile import decode_token
from logic.userLogic import registerFunction, loginFunction
from logic.todoLogic import addTodo, getTodos, deleteTodo
from dotenv import load_dotenv
import os

load_dotenv()

db_host = os.environ.get("DB_HOST")
db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")
db_name = os.environ.get("DB_NAME")


app = Flask(__name__)
CORS(app)

connection = create_connection(db_host, db_user, db_password, db_name)


# user
@app.route("/register", methods=["POST"])
def registerUserDef():
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        res = registerFunction(username, email, password,connection)
        return res
    except Exception as e:
        print(f"An error occurred during registration: {e}")
        return "0"


@app.route("/login", methods=["POST"])
def loginUserDef():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        cursor = connection.cursor()
        res = loginFunction(email,cursor,password)
        return res
    except Exception as e:
        print(f"An error occurred during login: {e}")
        return "0"


# todos

@app.route("/getTodos",methods=["GET"])
def getTodosByUserIdDef():
    try:
        auth_header = request.headers['Authorization']
        user_id = decode_token(auth_header)
        status = request.args.get('status')
        res = getTodos(connection,user_id,status)
        return res
    except Exception as e:
        print(f"An error occurred during login: {e}")
        return "0"




@app.route('/deleteTodo',methods=["DELETE"])
def deleteTodoDef():
    try:
        id = request.args.get('id')
        res = deleteTodo(connection ,id)
        return res
    except Exception as e:
        print(f"An error occurred during login: {e}")
        return "0"



@app.route("/addTodo", methods=["POST"])
def addTodoDef():
    try:
        auth_header = request.headers['Authorization']
        id = decode_token(auth_header)
        print(id)
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        status = data.get('status')
        date = data.get('date')
        res = addTodo(connection, title, description, status, date,id)
        print(res)
        return jsonify(res)
    except Exception as e:
        print(f"An error occurred during login: {e}")
        return {"error": "Failed to add todo"}