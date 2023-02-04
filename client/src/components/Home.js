import React,{useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

function App() {
  useEffect(() => {
      viewPost();
  }, []);

  const [isPost, setPost] = useState([]);
  const viewPost = async() =>{
    try {
      await axios.get(`http://localhost:8080/allPost`,)
      .then(res => { 
        if(res.data.success === true){
          setPost(res.data.listall);
        }
      })
    } catch (error) { throw error;}
  }
 
  return (
  <div>
    <div>
      <div>
        <h1> React <span> Quill </span> powerful rich text editor </h1>
        <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link>

        {isPost.map((item,index) => ( 
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