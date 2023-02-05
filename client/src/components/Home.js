import React,{useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

function App() {

  const [note, setNote] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/allNotes')
    .then((res) => {
        console.log(res)
        setNote(res.data)
    }).catch((err) => {
        console.log(err)
    })
  },[])
 
  return (
  <div>
    <div>
      <div>
        <h1> Quill Test Development </h1>
        <Link to="/Add"> Create New Note </Link>

        {note.map((item,index) => ( 
          <div key={index}>
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.note}}  />
            <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>
          </div>
        ))}
        
      </div>
    </div>
  </div>
  );
}

export default App;