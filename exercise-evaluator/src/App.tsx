import React, { useState } from 'react';
import WebcamFeed from './components/Webcamfeed';

function App() {
  const [exercise, setExercise] = useState<'squat' | 'pushup' | null>(null);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Exercise Evaluator</h1>
      <WebcamFeed exercise={exercise} />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setExercise('squat')}>Start Squats</button>
        <button onClick={() => setExercise('pushup')}>Start Push-Ups</button>
      </div>
    </div>
  );
}

export default App;
