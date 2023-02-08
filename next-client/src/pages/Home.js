import React,{useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import parse from 'html-react-parser';

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
    <div className='m-6'>
      <h1 className='mb-3 text-xl'> Quill Test Development </h1>
      <div className='mt-4'>
        {note.map((item,index) => ( 
          <div key={index} className="my-2 rounded-lg border border-black-600 p-2">
            <h2 className='mb-2'><span className='font-bold'>Title:</span> {item.title}</h2>
            <div>
              {/* {item.note} */}
              <div className="mt-2">
                {parse(item.note)}
              </div>
            </div>
            {/* <Link to={`/Edit/${item.id}`}> Edit </Link> */}
          </div>
        ))}
      </div>
      <Link to="/Add" className='font-bold bg-blue-200 rounded-md py-1 px-3'> Create New Note </Link>
    </div>
  </div>
  );
}

export default App;