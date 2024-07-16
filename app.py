from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient

app = Flask(__name__)
CORS(app)

client = InferenceClient(
    "meta-llama/Meta-Llama-3-8B-Instruct",
    token="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"
)

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.json
        print(f"Received request data: {data}")
        user_message = data.get("message")
        response = ""

        for message in client.chat_completion(
            messages=[{"role": "user", "content": user_message}],
            max_tokens=500,
            stream=True,
        ):
            response += message.choices[0].delta.content

        print(f"Generated response: {response}")
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
