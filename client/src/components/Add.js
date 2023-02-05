import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Add() {
  let navigate = useNavigate();
  const [isError, setError] = useState(null);
  const [note, setNote] = useState({
    title: '',
    body: '',
  });

  const onChangeTitle = (e) => {
    setNote({
      ...note, [e.target.name]:e.target.value
    });
  } 

  const onChangeBody = (value) => {
    console.log(value)
    setNote({
      ...note, body:value
    });
  } 

  const addNote = (e) => {
    e.preventDefault();
    e.persist();
    axios.post(`http://localhost:8000/api/addNote`, {
      title: note.title,
      note: note.body,
    }).then((res) => {
      console.log(res)
      navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }

return ( 
  <>
    <form className="m-6" onSubmit={addNote}>
      <h3 className="mb-4 text-xl"> Add New Note </h3>
      <div>
        <div>
          <label className="font-bold">Title: </label>
          <input className="bg-slate-100 rounded-md pl-2" type="text" name="title" value={note.title} onChange={onChangeTitle} placeholder="Enter title" required />
        </div>
        <div className="mt-3">
          <EditorToolbar toolbarId={'t1'}/>
          <ReactQuill
            theme="snow"
            value={note.body}
            onChange={onChangeBody}
            placeholder={"Write something awesome..."}
            modules={modules('t1')}
            formats={formats}
          />
        </div>
        <br/>
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