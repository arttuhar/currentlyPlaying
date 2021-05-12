import React from 'react';
import ScrobblesData from './components/ScrobblesData';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <ScrobblesData
        userName={'YOUR_USERNAME'}
        apiKey={'YOUR_APIKEY'}
      />
    </div>
  );
}

export default App;
