import bcrypt

import DB.db_user as db_user


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(user_name, plain_text_password):
    hashed_password = db_user.get_password_by_username(user_name)
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def registration(user_name, password):
    hashed_password = hash_password(password)
    user_data = db_user.add_user(user_name, hashed_password)
    return user_data


# CHECK IF IN DB

def get_id_by_username(username):
    result = db_user.if_username_exist(username)
    if int(result) == 1:
        return True
    else:
        return False


# PASSWORS ARE EQUAL

def is_equal(first_password, verified_password):
    if first_password == verified_password:
        return True
    else:
        return False


# NOT EMPTY FIELDS

def is_empty(data):
    if not data.isspace() and data != '':
        return True


def is_valid(user_name, first_password, verified_password):
    if is_empty(user_name) and is_empty(first_password) and is_empty(verified_password):
        return True
    else:
        return False


#def get_id_by_username(username):
#    if exists_already(username):
#        user_id = user_manager.get_id_for_user(username)
#        return user_id['id']
#    else:
#        return 0


def is_id_correct(username, session_user_id):
    user_id = get_id_by_username(username)
    if user_id == session_user_id:
        return True
    else:
        return False