from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import langchain as lc

# Load environment variables from .env file
load_dotenv()

app=Flask(__name__)

# Load api key
API_KEY=os.getenv('API_KEY')

# Allow React (frontend on port 3000) to access the backend
CORS(app)
data=None

@app.route('/response')
def response():
    return jsonify({'message': data})

@app.route('/message', methods=['POST'])
def message():
    raw=request.get_json()
    data=raw.get('message')
    print(data, raw)
    return jsonify({'message': raw})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
