from flask import Flask, render_template, url_for, redirect


# from flask import Flask, render_template, request, redirect, url_for, flash, Markup, session, escape
# from functools import wraps

app = Flask(__name__)

@app.route('/')
def route_index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )