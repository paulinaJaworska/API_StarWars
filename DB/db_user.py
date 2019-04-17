import db_connection


@db_connection.connection_handler
def add_user(cursor, login, password):
    cursor.execute("""
                INSERT INTO users(username, password)
                VALUES (%(login)s, %(password)s)
                RETURNING username
    """, {'login': login, 'password': password})
    user_data = cursor.fetchone()
    return user_data


@db_connection.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute("""
            SELECT password FROM users
            WHERE username = %(username)s
    """, {'username': username})
    password = cursor.fetchone()
    return password['password']


@db_connection.connection_handler
def if_username_exist(cursor, username):
    cursor.execute("""
            SELECT CASE WHEN EXISTS (SELECT 1
                                 FROM users
                                 WHERE username = %(username)s)
                    THEN CAST (1 AS bit)
                    ELSE CAST (0 AS bit)
                    END
            AS bit
    """, {'username': username})
    exist = cursor.fetchone()
    return exist['bit']


@db_connection.connection_handler
def get_id_by_username(cursor, username):
    cursor.execute("""
        SELECT id FROM users
        WHERE username = %(username)s
    """, {'username': username})
    user_id = cursor.fetchone()
    return user_id