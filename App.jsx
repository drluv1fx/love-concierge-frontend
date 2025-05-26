import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(\`\${import.meta.env.VITE_BACKEND_URL}/history/\${email}\`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Love Concierge</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchHistory}>Get My History</button>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>Goal:</strong> {entry.goal}<br />
            <strong>Advice:</strong> {entry.advice}<br />
            <strong>Time:</strong> {entry.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
