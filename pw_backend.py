import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS
import globalAlign

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def receive_sequences():
    data = request.get_json()
    seq1 = data.get('seq1')
    seq2 = data.get('seq2')
    alignType = data.get('alignType', [])
    sequenceType = data.get('sequenceType', [])

    print(f"Sequence 1: {seq1}")
    print(f"Sequence 2: {seq2}")
    print('User selected:', alignType)
    print('User selected:', sequenceType)

    if sequenceType == "nucleotide":
        with open("nucleotide.mtx", "r") as file:
            score_matrix = file.readlines()
    elif sequenceType == "protein":
        with open("BLOSUM50.mtx", "r") as file:
            score_matrix = file.readlines()

    scoreIndex = 0
    for row in score_matrix:
        row = row.strip("\n")
        score_matrix[scoreIndex] = row
        scoreIndex += 1
    score_matrix[0] = "0" + score_matrix[0]
    score_matrix = [row.split() for row in score_matrix]

    if alignType == "Global":
        alignedSequences, alignmentScore = globalAlign.main([seq1, seq2], score_matrix)

    elif alignType == "Local":
        subprocess.run([
        "python3", "localAlign.py",
        "-i", "in.fna",
        "-o", "out.fna",
        "-s", "nucleotide.mtx"
        ])

    


    with open("out.fna", "r") as file:
        sequenceFile = [line.strip() for line in file]
    
    alignedSequence1 = sequenceFile[1]
    alignedSequence2 = sequenceFile[3]
    #Store aligned sequences from outputfile as strings
    


    return jsonify({"status": f"sequences received and alignment started \n {alignedSequence1}, {alignedSequence2}"}), 200


if __name__ == '__main__':
    app.run(debug=True)
