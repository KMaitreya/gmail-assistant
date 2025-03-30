from flask import Flask, jsonify
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

@app.route('/')
def main_page():
    return jsonify({'message': "We are ready to go"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
