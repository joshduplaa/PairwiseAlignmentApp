import os
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
    
    #Save sequences to a FASTA file
    fasta_filename = "in.fna"
    with open(fasta_filename, "w") as fasta_file:
        fasta_file.write(f">seq1\n{seq1}\n")
        fasta_file.write(f">seq2\n{seq2}\n")

    subprocess.run([
    "python3", "globalAlign.py",
    "-i", "in.fna",
    "-o", "out.fna",
    "-s", "nucleotide.mtx"
    ])

    return jsonify({"status": "sequences received and alignment started"}), 200


if __name__ == '__main__':
    app.run(debug=True)
