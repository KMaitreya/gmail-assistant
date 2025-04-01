from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from google import genai
import markdown
import re

# Load environment variables from .env file
load_dotenv()

app=Flask(__name__)

#load the API key from the environment variable
API_KEY = os.getenv('API_KEY')  # Print the API key for debugging purposes (ensure to remove this in production)


def Gemini(message):
    client = genai.Client(api_key=API_KEY)  # Initialize the Gemini client with the API key
    response=client.models.generate_content(
        model='gemini-1.5-pro',
        contents=message
    )
    response=markdown.markdown(response.text)
    return response

# Allow React (frontend on port 3000) to access the backend
CORS(app)

@app.route('/response')
def response():
    return jsonify({'message': 'Hello from the backend!'})

@app.route('/message', methods=['POST'])
def message():
    raw=request.get_json()
    data=raw.get('message')
    response=Gemini(data)
    print(data, response)  # Print the input and output for debugging purposes
    return jsonify({'message': response})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
