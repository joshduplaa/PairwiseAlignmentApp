import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/align', methods=['POST'])
def receive_sequences():
    data = request.get_json()
    seq1 = data.get('seq1')
    seq2 = data.get('seq2')
    
    print(f"Sequence 1: {seq1}")
    print(f"Sequence 2: {seq2}")
    
    # Save sequences to a FASTA file
    fasta_filename = "sequences.fasta"
    with open(fasta_filename, "w") as fasta_file:
        fasta_file.write(f">seq1\n{seq1}\n")
        fasta_file.write(f">seq2\n{seq2}\n")

    # Call globalAlign.py with the FASTA file as a parameter
    try:
        subprocess.run(["python", "globalAlign.py", fasta_filename], check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Error running globalAlign.py", "details": str(e)}), 500

    return jsonify({"status": "sequences received and alignment started"}), 200


if __name__ == '__main__':
    app.run(debug=True)
