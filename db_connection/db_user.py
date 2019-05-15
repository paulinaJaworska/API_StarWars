import db_connection


@db_connection.connection_handler
def get_user_by_username(cursor, username):
    cursor.execute("""
                SELECT username FROM users
                WHERE username=%(username)s;""",
                   {'username': username})
    username = cursor.fetchone()
    return username # will return none in case it is not in db


@db_connection.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute("""
                SELECT password FROM users
                WHERE username=%(username)s;""",
                   {'username': username})
    password = cursor.fetchone()
    return password


@db_connection.connection_handler
def add(cursor, username, password):
    cursor.execute("""
                INSERT INTO users(username, password)
                VALUES (%(username)s, %(password)s)
                RETURNING username;""",
                   {'username': username, 'password': password})
    username = cursor.fetchone()
    return username


