import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from "react";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LoginRegister from './components/LoginRegister';
import AllMovies from './components/AllMovies';



function App() {



const [user, setUser] = useState();
return (
    <div className="App">
        <BrowserRouter className="app">
          <Routes>
            <Route exact path ="/" element = {<LoginRegister setUser={setUser}/>}/>
            <Route exact path ="/dashboard" element = {<Dashboard user={user} setUser={setUser}/>}/>
            <Route path="/movies" element={<AllMovies/> }/>
          </Routes>
        </BrowserRouter>
        
    </div>
  );

}



export default App;
