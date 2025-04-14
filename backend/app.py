from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from google import genai  # Gemini API client
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Load the Gemini API key from environment
API_KEY = os.getenv('API_KEY')
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Global variable to store preloaded email context
ALL_EMAILS = []
email=None

@app.route('/email', methods=['POST'])
def create_token():
    global email
    raw=request.get_json()
    email=raw.get('email')
    filename=f"./tokens/{email}.json"

    creds = None
    if os.path.exists(filename):
        creds = Credentials.from_authorized_user_file(filename, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(
                    port=5002,
                    authorization_prompt_message='Please visit this URL: {url}',
                    success_message='Authorization complete. You may close this window.',
                    open_browser=True,
                    access_type='offline',
                    prompt='consent'  # <- this is what forces Google to reissue refresh tokens
)
        with open(filename, 'w') as token:
            token.write(creds.to_json())

    return jsonify({'message': 'Token created successfully!'})

def authenticate_gmail():
    """
    Handles Gmail API authentication using OAuth 2.0.
    Checks for stored credentials in token.json and refreshes or requests new ones if needed.
    """
    # creds = None
    # if os.path.exists('token.json'):
    #     creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    #     print(creds.to_json())
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
    #         creds = flow.run_local_server(port=5002)
    #     with open('token.json', 'w') as token:
    #         token.write(creds.to_json())
    # return creds

    # global token

    # if not token:
    #     return jsonify({'message': 'No token provided'}), 400
    # creds = Credentials(token=token, scopes=SCOPES)

    # if creds and creds.expired and creds.refresh_token:
    #     creds.refresh(Request())

    # return creds
    global email

    return Credentials.from_authorized_user_file(f"./tokens/{email}.json", SCOPES)

def get_all_emails():
    """
    Fetches emails from Gmail.
    This example fetches emails from the last day; modify the query as needed.
    """
    creds = authenticate_gmail()
    if not creds:
        return []
    print(creds)
    service = build('gmail', 'v1', credentials=creds)
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q='newer_than:1d').execute()
    messages = results.get('messages', [])
    
    if not messages:
        return []

    email_data = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg.get('payload', {})
        headers = payload.get('headers', [])
        email_info = {
            'subject': next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject'),
            'from': next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown Sender'),
            'snippet': msg.get('snippet', '')
        }
        email_data.append(email_info)
    return email_data

def format_email_context(emails):
    """
    Formats the email data into a readable string for the Gemini API.
    """
    if not emails:
        return "No recent emails found."

    formatted_emails = "\n\n".join(
        f"From: {email['from']}\nSubject: {email['subject']}\nSnippet: {email['snippet']}"
        for email in emails
    )
    return formatted_emails

def Gemini(message):
    """
    Sends a prompt to the Gemini API and returns the generated response.
    """

    client=genai.Client(api_key=API_KEY)
    response = client.models.generate_content(
        model='gemini-1.5-pro',
        contents=message
    )

    if response:
        return response.text
    
    # if response and response.candidates:
    #     return response.candidates[0].content
    return "No response from Gemini."

@app.route('/response')
def response():
    """
    A simple endpoint to verify the backend is running.
    """
    return jsonify({'message': 'Hello from the backend!'})

@app.route('/message', methods=['POST'])
def message():
    """
    Accepts a JSON payload with a 'message' key (the user's question).
    Fetches the latest emails, combines them with the question, sends it to Gemini,
    and returns the response.
    """
    global ALL_EMAILS  # Ensure we're working with the latest emails
    ALL_EMAILS = get_all_emails()
    
    email_context = format_email_context(ALL_EMAILS)

    raw = request.get_json()
    question = raw.get('message', '')
    
    # Build the prompt using the latest email context and the user's question.
    combined_prompt = (
        f"Here are your recent emails:\n{email_context}\n\n"
        f"Now answer this question based on them:\n{question}"
    )
    
    gemini_response = Gemini(combined_prompt)
    return jsonify({'message': gemini_response})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)