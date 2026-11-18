import os
import webbrowser
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='dist', template_folder='dist')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('dist', filename)

if __name__ == '__main__':
    print("====================================================")
    print("   Starting CyberFortress Sentinel (Flask Server)...")
    print("====================================================")
    print("Opening browser at http://localhost:5000/ ...")
    webbrowser.open('http://localhost:5000/')
    app.run(host='0.0.0.0', port=5000, debug=True)
