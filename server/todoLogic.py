

def addTodo(connection, title, description, status, date,userId):
    cursor = connection.cursor()
    query = f"INSERT INTO todos (title, description, status, date,userId) VALUES ('{title}', '{description}', '{status}','{date}','{userId}')"
    cursor.execute(query)
    connection.commit()
    return {"message": "Todo added successfully"}



def getTodos(connection, userId,status):
    cursor = connection.cursor()
    query = f"SELECT * FROM todos WHERE userId = {userId} AND status = '{status}'"
    cursor.execute(query)
    column_names = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(column_names, row)) for row in rows]


def deleteTodo(connection,id):
    cursor = connection.cursor()
    query = f"DELETE FROM todos WHERE id = {id}"
    cursor.execute(query)
    connection.commit()
    return {"message": "Todo added successfully"}