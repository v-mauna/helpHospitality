import React from 'react';
import './App.css';
import Navbar from '../src/navBar/navbar'
import Routes from './routes'
import {
  BrowserRouter as Router,

} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes/>
      </Router>
    </div>
  );
}

export default App;
