'use client';

import { useState } from 'react';
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Home() {
  //defining object state (constructors) for backend
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [local, setLocal] = useState(false)
  const [global, setGlobal] = useState(false)
  const [response, setResponse] = useState('');

  //Function to handle submit
  const handleSubmit = async () => {
    if (!global && !local) {
      alert('Please select at least one: Global or Local')
      return
    }
    //sends values to API, replace API route with secret when possible
    const res = await fetch('http://localhost:5000/align', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2, scope: { global, local } }),
    });
    const data = await res.json();
    setResponse(data.status);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Pairwise Alignment</h1>
      {/**Global or local alignment selection */}
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={global} onChange={() => {setGlobal(true); setLocal(false)}} />} label="Global" />
        <FormControlLabel control={<Checkbox checked={local} onChange={() => {setLocal(true); setGlobal(false)}} />} label="Local" />
      </FormGroup>
      {/**Sequence 1 text box */}
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Sequence 1"
        value={seq1}
        onChange={(e) => setSeq1(e.target.value)}
      />
      {/**Sequence 2 text box */}
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Sequence 2"
        value={seq2}
        onChange={(e) => setSeq2(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>
      {response && <p className="mt-4">{response}</p>}
    </>
  );
}
