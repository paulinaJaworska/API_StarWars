from flask import Flask, render_template, url_for, request, session, jsonify
import os


app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')


@app.route('/')
def route_index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )