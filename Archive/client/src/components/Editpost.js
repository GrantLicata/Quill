import React,{useState} from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditPost(props) {
  
  return (
    <div className="m-6">
      {/* Note Editing Form */}
      <form onSubmit={editNote}>
        <div>
          <label className="font-bold">Title: </label>
          <input className="bg-slate-100 rounded-md pl-2" type="text" name="title" value={note.title} onChange={onChangeTitle} placeholder="Enter title" required />
        </div>
        <ReactQuill
          theme="snow"
          value={draft.body}
          onChange={onChangeBody}
          placeholder={"Write something awesome..."}
          style={{height: "200px"}}
          className="mt-3"
          />
        <div className="mt-3">
          {isError !== null && <div> {isError} </div>}
        </div>
        <button className="bg-blue-200 rounded-lg p-1 hover:bg-blue-400 px-4 py-1 mt-11" type="submit">Submit</button>
      </form>
    </div>
  )
}
export default EditPost