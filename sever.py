from flask import Flask, render_template, url_for, redirect


# from flask import Flask, render_template, request, redirect, url_for, flash, Markup, session, escape
# from functools import wraps

app = Flask(__name__)

@app.route('/')
def route_index():
    return render_template('index.html')

@app.route('/registration')
@login_forbidden
def route_show_register_form():
    return render_template('registration.html',
                           form_url='/registration')


@app.route('/registration', methods=['POST'])
@login_forbidden
def route_user_register():
    username = escape(request.form.get('username'))
    first_password = escape(request.form.get('password_one'))
    validation_password = escape(request.form.get('password_two'))

    if not user.is_all_data_validate(username, first_password, validation_password):
        flash('Please provide all data')
        return redirect(url_for('route_show_register_form'))

    if user.is_exist_already(username):
        flash('This username exist already')
        return redirect(url_for('route_show_register_form'))

    if not user.is_passwords_equal(first_password, validation_password):
        flash('Passwords must be equal')
        return redirect(url_for('route_show_register_form'))

    user_data = user.registration(username, first_password)
    return redirect(url_for('route_index'))


@app.route('/login')
@login_forbidden
def route_show_login_form():
    return render_template('registration.html',
                           form_url='/login')


@app.route('/login', methods=['POST'])
@login_forbidden
def route_login():
    username = request.form.get('username')
    password = request.form.get('password_one')
    try:
        user_id = user.get_id_by_username(username)
        if user.verify_password(username, password):
            session['username'] = username
            session['id'] = user_id
            flash('Welcome {0}'.format(username))
            return redirect(url_for('route_main'))
        else:
            flash('Wrong password')
            return redirect(url_for('route_show_login_form'))

    except user.WrongUsername:
        flash('Such user do not exist')
        return redirect(url_for('route_show_login_form'))


@app.route('/logout')
@login_required
def route_logout():
    session.pop('username', None)
    session.pop('id', None)
    return redirect(url_for('route_main'))



@app.errorhandler(405)
def method_not_allowed(error):
    return render_template('errors.html',
                           error=405,
                           error_message='Method not allowed')


# wrapper to verify if user is logged
def login_required(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if 'username' in session:
            return func(*args, **kwargs)
        else:
            flash("You need to login first")
            return redirect(url_for('route_login'))

    return wrap


# wrapper to verified if user is not logged
def login_forbidden(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if 'username' not in session:
            return func(*args, **kwargs)
        else:
            flash("You are already logged {0}".format(session['username']))
            return redirect(url_for('route_main'))

    return wrap

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )