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
    selected = data.get('selected', [])

    print(f"Sequence 1: {seq1}")
    print(f"Sequence 2: {seq2}")
    print('User selected:', selected)
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
    
    #Store aligned sequences from outputfile as strings
    alignedString1 = "Eat"
    alignedString2 = "Dirt"


    return jsonify({"status": f"sequences received and alignment started \n {alignedString1}\n {alignedString2}"}), 200


if __name__ == '__main__':
    app.run(debug=True)
