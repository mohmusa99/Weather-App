import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Weather from './components/Weather';
import WeatherResult from './components/WeatherResult';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Weather />} />
          <Route path="/result" element={<WeatherResult />} />
        </Routes>
      </div>
    </Router>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

