import './App.css';
import React from 'react'
import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import MovieProfile from './views/MovieProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>"
          <Route element={<Dashboard/>} path="/home" default />
          <Route element={<MovieProfile/>} path="/movie-profile/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
