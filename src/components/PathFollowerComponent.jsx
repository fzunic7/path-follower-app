import React, { useState } from 'react';
import followPath from '../utils/pathFollower';

const PathFollowerComponent = () => {
  const [result, setResult] = useState({ collectedLetters: '', path: '' });
  const [error, setError] = useState('');

  const map = [
    ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
    [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
    [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+']
  ];

  const handleRun = () => {
    try {
      const result = followPath(map);
      setResult(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult({ collectedLetters: '', path: '' });
    }
  };

  return (
    <div>
      <h1>Path Follower</h1>
      <button onClick={handleRun}>Follow Path</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Collected Letters: {result.collectedLetters}</p>
      <p>Path: {result.path}</p>
    </div>
  );
};

export default PathFollowerComponent;
