from flask import Flask, render_template, url_for, request, session, jsonify
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

import user
import vote


@app.route('/')
def route_index():
    return render_template('index.html')


# REGISTRATION AND LOGIN
@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()
    username = data['username']
    password = data['password']
    repeated_password = data['confirmPassword']

    if not user.is_data_validate(username, password, repeated_password):
        return jsonify({'state': 'empty'})

    if user.is_already_in_db(username):
        return jsonify({'state': 'in_base'})

    if not user.is_equal(password, repeated_password):
        return jsonify({'state': 'not_equal'})

    else:
        user.register(username, password)
        return jsonify({'state': 'success'})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if user.is_already_in_db(username) and user.verify_password(username, password):
        session['username'] = username
        session['id'] = user.get_id_by_username(username)

        return jsonify({'state': 'success'})

    else:
        return jsonify({'state': 'error'})


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    if not session:
        return jsonify({'state': 'success'})
    else:
        return jsonify({'state': 'error'})


# VOTING SRARISTICS
@app.route('/vote', methods=['POST'])
def vote():
    planet_data = request.get_json()
    username = planet_data['username']
    user_id = session['id']
    planet_vote_data = {'planet_name': planet_data['planet_name'],
                        'planet_id': planet_data['planet_id'],
                        'user_id': user_id
                        }
    if user.is_id_correct(username, user_id):
        planet_name = vote_.vote_planet(planet_vote_data)
        return jsonify({'state': planet_name['planet_name']})


@app.route('/user-vote', methods=['POST'])
def user_vote():
    data = request.get_json()
    username = data['username']
    voted_planets = vote_.get_voted_planets_for_user(username)
    return jsonify({'planetsId': voted_planets})


@app.route('/statistic')
def statistic():
    planet_votes = vote_.get_for_planets()
    return jsonify({'planet_votes': planet_votes})


@app.route('/error', methods=['POST'])
def log_js_errors():
    error = request.get_json()
    log.logger.critical('%s', error)




















if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )