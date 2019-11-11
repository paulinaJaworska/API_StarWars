from flask import Flask, render_template, url_for, request, session, jsonify
import os

import data_manager.user as user
from data_manager.vote import get_voted_planets_for_user, get_for_planets, vote_planet

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if user.get_id_by_username(username) and user.verify_password(username, password):
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


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    data = request.get_json()
    username = data['username']
    first_password = data['password']
    validation_password = data['confirmPassword']

    if not user.is_valid(username, first_password, validation_password):
        return jsonify({'state': 'empty'})

    if user.get_id_by_username(username):
        return jsonify({'state': 'in_base'})

    if not user.is_equal(first_password, validation_password):
        return jsonify({'state': 'not_equal'})

    else:
        user.registration(username, first_password)
        return jsonify({'state': 'success'})


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
        planet_name = vote_planet(planet_vote_data)  #
        return jsonify({'state': planet_name['planet_name']})


@app.route('/user-vote', methods=['POST'])
def user_vote():
    data = request.get_json()
    username = data['username']
    voted_planets = get_voted_planets_for_user(username)  #
    return jsonify({'planetsId': voted_planets})


@app.route('/statistic')
def statistic():
    planet_votes = get_for_planets()  #
    return jsonify({'planet_votes': planet_votes})


# @app.route('/error', methods=['POST'])
# def log_js_errors():
#     error = request.get_json()
#     log.logger.critical('%s', error)

@app.route('/update_status', methods=['POST'])
def update_status():
    planet_data = request.get_json()
    planet_vote_data = {'planet_id': planet_data['episode_id'],
                        }
    planet_name = vote_planet(planet_vote_data)  #
    return jsonify({'state': planet_name['planet_name']})


if __name__ == "__main__":
    app.run(
        debug=True,
        port=8000
    )

# # AJAX WAY
# import jsonify
# @app.route('/hello')
# # POST request
# if request.method == 'POST':
#     print("Incoming..")
#     print(request.get.json())  # parse as JSON
#     return 'OK', 200
# # GET request
# else:
#     message = {'greeting': 'Hello from Flask'}
#     return josinify(message) # serialize and use JSON headers
#
# @app.route('/test')
# def test_page(): # look inside template and serve index.html
#     return render_template('index.html')
