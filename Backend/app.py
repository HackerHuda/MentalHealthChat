from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    # For now, just echo the message back with a simple response
    bot_response = f"Echo: {user_message}"
    return jsonify({"reply": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
