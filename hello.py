from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/align', methods=['POST'])
def receive_sequences():
    data = request.get_json()
    seq1 = data.get('seq1')
    seq2 = data.get('seq2')
    
    print(f"Sequence 1: {seq1}")
    print(f"Sequence 2: {seq2}")
    
    return jsonify({"status": "sequences received"}), 200

if __name__ == '__main__':
    app.run(debug=True)
