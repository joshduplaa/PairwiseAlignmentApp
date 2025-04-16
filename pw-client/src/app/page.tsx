'use client';

import { useState } from 'react';
import * as React from 'react';

export default function Home() {
  //defining object state (constructors) for backend
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [selected, setSelected] = useState<string>('') // Store a single selected option
  const [response, setResponse] = useState('');


  const handleSelection = (value: string) => {
    setSelected(value)
  }

  //Function to handle submit
  const handleSubmit = async () => {

    //sends values to API, replace API route with secret when possible
    const res = await fetch('https://7489-66-76-35-188.ngrok-free.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2, selected }),
    });
    const data = await res.json();
    setResponse(data.status);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Pairwise Alignment</h1>

      <div className='input'>
        {/**Sequence 1 text box */}
        <textarea placeholder="Sequence 1" value={seq1} onChange={(e) => setSeq1(e.target.value)}/>
        {/**Sequence 2 text box */}
        <textarea placeholder="Sequence 2" value={seq2} onChange={(e) => setSeq2(e.target.value)}/>
        {/**Alignment Type selection */}
        {['Global', 'Local'].map((option) => (
          <label key={option} className="block">
            <input
            type="radio"
            name="alignment_type" //name of button group
            value={option}
            checked={selected === option} //check if this option is selected
            onChange={() => handleSelection(option)} //set the selected value
          />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>

      {/**Response from API */}
      {response && <p className="mt-4">{response}</p>}
    </>
  );
}
