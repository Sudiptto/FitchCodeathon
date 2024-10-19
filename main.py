""""
    This is the file where the API routes are
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# sample route to return "Hello World"
@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello World'})


if __name__ == '__main__':
    app.run(debug=True)