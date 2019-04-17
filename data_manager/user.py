import bcrypt

import db_user as user_manager
import logging_rules as log
import comment as comment
import useful as util


class SavingDataProblem(Exception):
    """ If problems with saving data occurs"""
    pass


class ReadingProblem(Exception):
    """ If there is problem reading data"""
    pass


class WrongPassword(Exception):
    """ When password from user and stored password don't match"""
    pass


class WrongUsername(Exception):
    """ When username do not exist in database"""
    pass


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(user_name, plain_text_password):
    hashed_password = user_manager.get_password_for_user(user_name)
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def get_by_id(user_id):
    try:
        user_data = user_manager.get_data_for_user(user_id)
        return user_data
    except Exception as err:
        log.logger.error('%s', err)
        log.logging.exception(err)
        raise ReadingProblem


def validate(data):
    if not data.isspace():
        return True


def is_all_data_validate(user_name, first_password, verified_password):
    if validate(user_name) \
            and validate(first_password) \
            and validate(verified_password):
        return True
    else:
        return False


def is_exist_already(user_name):
    result = user_manager.check_if_username_in_logins(user_name)
    if int(result) == 1:
        return True
    else:
        return False


def is_passwords_equal(first_password, verified_password):
    if first_password == verified_password:
        return True
    else:
        return False


def registration(user_name, password):
    hashed_password = hash_password(password)
    user_data = user_manager.add_user(user_name, hashed_password)
    return user_data


def get_id_by_username(username):
    if is_exist_already(username):
        user_id = user_manager.get_id_for_user(username)
        return user_id['id']
    else:
        raise WrongUsername