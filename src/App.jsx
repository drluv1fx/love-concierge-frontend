import React, { useState } from 'react';

function App() {
  const [situation, setSituation] = useState('');
  const [email, setEmail] = useState('');
  const [advice, setAdvice] = useState('');

  const handleGenerate = async () => {
    setAdvice('Loading...');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          situation,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setAdvice(data.message || 'No advice returned.');
    } catch (err) {
      console.error(err);
      setAdvice('Network error');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Love Concierge</h1>
      <h2>Get Dating Advice</h2>
      <textarea
        rows="6"
        cols="60"
        placeholder="Describe your situation..."
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: '1rem', width: '300px' }}
      />
      <br />
      <button onClick={handleGenerate} style={{ marginTop: '1rem' }}>
        Generate Message
      </button>
      <h3>Advice:</h3>
      <p>{advice}</p>
    </div>
  );
}

export default App;
