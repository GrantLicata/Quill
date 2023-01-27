import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
  let history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    title: '',
    description: '',
    information: '',
  });

  const onChangeValue = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 

  const onDescription = (value) => {
    setUserInfo({ ...userInfo,
      description:value
    });
  } 

  const onInformation = (value) => {
    setUserInfo({ ...userInfo,
      information:value
    });
  } 

  const [isError, setError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if(userInfo.description.length < 50){
        setError('Required, Add description minimum length 50 characters');
        return;
      }
      axios.post(`http://localhost:8080/addArticle`, {
        title: userInfo.title,
        description: userInfo.description,
        information: userInfo.information,
      })
      .then(res => {
        if(res.data.success === true){
          history.push('/');
        }
      })
    } catch (error) { throw error;}    
  } 

return ( 
  <>
    <form onSubmit={addDetails}>
      <h3> Add New Note </h3>
      <div>
        <div>
          <label> Title <span> * </span> </label>
          <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} placeholder="Title" required />
        </div>
        <div>
          <label> Description <span> * </span> </label>
        <EditorToolbar toolbarId={'t1'}/>
        <ReactQuill
          theme="snow"
          value={userInfo.description}
          onChange={onDescription}
          placeholder={"Write something awesome..."}
          modules={modules('t1')}
          formats={formats}
        />
        </div>
        <br />
        {isError !== null && <div> {isError} </div>}
        <div>
          <button type="submit"> Submit  </button>
        </div> 
      </div> 
    </form>
  </>
)
}
export default Add