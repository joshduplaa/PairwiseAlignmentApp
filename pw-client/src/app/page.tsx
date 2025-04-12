'use client';

import { useState } from 'react';

export default function Home() {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/align', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seq1, seq2 }),
    });
    const data = await res.json();
    setResponse(data.status);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Pairwise Alignment</h1>
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Sequence 1"
        value={seq1}
        onChange={(e) => setSeq1(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border"
        placeholder="Sequence 2"
        value={seq2}
        onChange={(e) => setSeq2(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
