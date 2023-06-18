from jwtFile import create_token


def registerFunction(username, email, password, connection):
    cursor = connection.cursor()
    query = f"INSERT INTO users (username, email, password) VALUES ('{username}', '{email}', '{password}')"
    cursor.execute(query)
    connection.commit()
    last_insert_id = cursor.lastrowid
    token = create_token(last_insert_id, username, email)
    return token


def loginFunction(email, cursor, password):
    query = f"SELECT * FROM users WHERE email = '{email}'"
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows) == 0:
        return "0"
    id = rows[0][0]
    savedUsername = rows[0][1]
    savedEmail = rows[0][2]
    savedPassword = rows[0][3]
    if savedEmail == email and savedPassword == password:
        token = create_token(id, savedUsername, savedEmail)
        return token
    else:
        return "0"
