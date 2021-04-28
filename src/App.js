import React from 'react';
import ScrobblesData from './components/ScrobblesData';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ScrobblesData
        userName={LASTFM_USERNAME}
        apiKey={LASTFM_APIKEY}
      />
    </div>
  );
}

export default App;
