import React from 'react';
import mongoose from 'mongoose';

const App = () => {
  const handleClick = () => {
    console.log("I've been clicked!");
  };

  return (
    <div>
      <h1>Swifting Eras</h1>
      <p>An album and lyrical archive...</p>
      <button onClick={handleClick}>Albums</button>
      <button onClick={handleClick}>Songs</button>
      <button onClick={handleClick}>About</button>
    </div>
  );
};

export default App;
