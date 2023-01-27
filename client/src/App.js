import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

function App() {
  return (
    <div>
      <Router basename="/">
        <Routes> 
          <Route exact path="/" component={Home}/>
          <Route path="/Add" component={Add}/>
          <Route path="/Edit/:postID" component={Edit}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
