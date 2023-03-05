import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/Add" element={<Add />}/>
          <Route path="/Edit/:postID" element={<Edit />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
