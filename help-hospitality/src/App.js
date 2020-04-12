import React from 'react';
import './App.css';
import Routes from './routes'
import Footer from './footer/footer'

export default function App() {
  return (
    <div className="App">
      <div id="content">
      <Routes/>
      <div id="footer">
      <Footer />
      </div>
    </div>
    </div>
  );
}


