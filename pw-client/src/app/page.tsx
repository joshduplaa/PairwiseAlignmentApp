'use client';

import { useState } from 'react';
import * as React from 'react';

export default function Home() {
  //defining object state (constructors) for backend
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [sequenceType, setSequenceType] = useState<string>('DNA') //Store a selected sequence type (DNA or Protein)
  const [alignType, setAlignType] = useState<string>('') //Store a selected alignment type option for local or global
  const [response, setResponse] = useState('');

  //event handler function for alignment type selection
  const handleSequenceType = (value: string) => {
    setSequenceType(value)
  }

  //event handler for alignment type selection
  const handleAlignTypeSelection = (value: string) => {
    setAlignType(value)
  }
  

  //Function to handle submit
  const handleSubmit = async () => {
    //Checks if the user has filled in the form correctly
    if (!seq1 || !seq2 || !sequenceType || !alignType) {
      alert('Make sure all options are selected and the text boxes are not empty!');
      return;
    }
    //sends values to API, replace API route with secret when possible
    const res = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2, sequenceType, alignType}),
    });
    const data = await res.json();
    setResponse(data.status);
  };

  return (
    <>
      {/**Title */}
      <h1 className="title">Pairwise Alignment Tool</h1>

      {/**Introduction */}
      <p className="intro">A web app for pairwise DNA and protein sequence alignment using Needleman-Wunsch (global) and Smith-Waterman (local) algorithms. Developed by Joshua Duplaa in Python for Dr. Rees&apos;t Bioinformatics course at TTU.</p>
      
      <div className='mainform'>

        {/**Sequence Type selection */}
        <div className="selector">
          <span>Input Sequence Type - </span>
          {['DNA', 'Protein'].map((option) => (
              <label key={option}>
                <input
                type="radio"
                name="sequence_type" //name of button group
                value={option}
                checked={sequenceType === option} //check if this option is alignType
                onChange={() => handleSequenceType(option)} //set the alignType value
              />
                <span>{option} </span>
              </label>
            ))}
        </div>
        <div className='input'>
          {/**Sequence 1 text box */}
          <textarea placeholder="Sequence 1" value={seq1} onChange={(e) => {
              if(sequenceType=="DNA"){
                const value = e.target.value.toUpperCase().replace(/[^ACGT]/g, '');
                setSeq1(value);
              }
              else if(sequenceType=="Protein"){
                const value = e.target.value.toUpperCase().replace(/[^ARNDCQEGHILKMFPSTWYVBJZ]/g, '');
                setSeq1(value);
              }
            }
          }/>
          {/**Sequence 2 text box */}
          <textarea placeholder="Sequence 2" value={seq2} onChange={(e) => {
              if(sequenceType=="DNA"){
                const value = e.target.value.toUpperCase().replace(/[^ACGT]/g, '');
                setSeq2(value);
              }
              else if(sequenceType=="Protein"){
                const value = e.target.value.toUpperCase().replace(/[^ARNDCQEGHILKMFPSTWYVBJZ]/g, '');
                setSeq2(value);
              }
            }
          }/>
          {/**Alignment Type selection */}
          <span> Alignment Type - </span>
          {['Global', 'Local'].map((option) => (
            <label key={option}>
            <input
            type="radio"
            name="alignment_type" //name of button group
            value={option}
            checked={alignType === option} //check if this option is alignType
            onChange={() => handleAlignTypeSelection(option)} //set the alignType value
          />
            <span>{option} </span>
          </label>
        ))}
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>

      {/**Response from API */}
      {response && <p className="mt-4">{response}</p>}
    </>
  );
}
