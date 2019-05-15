import bcrypt

import db_user

# password

def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(user_name, plain_text_password):
    hashed_password = db_user.get_password_by_username(user_name)
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def register(user_name, password):
    hashed_password = hash_password(password)
    user_data = db_user.add(user_name, hashed_password)
    return user_data


# form data validation

# CHECK IF IN DB

def get_id_by_username(username):
    result = db_user.get_user_by_username(username)
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
