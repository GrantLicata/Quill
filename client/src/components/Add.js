import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
  let navigate = useNavigate();
  const [isError, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({
    title: '',
    note: '',
  });

  const onChangeValue = (e) => {
    setUserInfo({
      ...userInfo, [e.target.name]:e.target.value
    });
  } 

  const onDescription = (value) => {
    setUserInfo({ ...userInfo, note:value
    });
  } 

  const addNote = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if(userInfo.note.length < 5){
        setError('Required, Add note minimum length 5 characters');
        return;
      }
      axios.post(`http://localhost:8080/addNote`, {
        title: userInfo.title,
        note: userInfo.note,
      })
      .then(res => {
        if(res.data.success === true){
          navigate('/');
        }
      })
    } catch (error) { throw error;}    
  } 

return ( 
  <>
    <form onSubmit={addNote}>
      <h3> Add New Note </h3>
      <div>
        <div>
          <label> Title <span> * </span> </label>
          <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} placeholder="Title" required />
        </div>
        <div>
          <label> Note <span> * </span> </label>
        <EditorToolbar toolbarId={'t1'}/>
        <ReactQuill
          theme="snow"
          value={userInfo.note}
          onChange={onDescription}
          placeholder={"Write something awesome..."}
          modules={modules('t1')}
          formats={formats}
        />
        </div>
        <br />
        {isError !== null && <div> {isError} </div>}
        <div>
          <button className="bg-gray-300 rounded-lg p-1 hover:bg-slate-200" type="submit"> Submit  </button>
        </div> 
      </div> 
    </form>
  </>
)
}
export default Add