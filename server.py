from flask import Flask, render_template, request, jsonify

import user

app = Flask(__name__)


@app.route('/')
def route_index():
    return render_template('planets.html')


@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()
    username = data['username']
    password = data['password']
    confirmed_password = data['confirmPassword']

    if not user.is_valid(username, password, confirmed_password):
        return jsonify({'state': 'empty'})

    if user.get_id_by_username(username):
        return jsonify({'state': 'already_exists'})

    if not user.is_equal(password, confirmed_password):
        return jsonify({'state': 'not_equal'})

    else:
        user.register(username, password)
        return jsonify({'state': 'success'})


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )