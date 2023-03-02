import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import { useRouter } from "next/router";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(import('react-quill'), {ssr: false});

//Document that may hold solution to document undefined error:
// https://flaviocopes.com/error-document-not-defined/
// https://github.com/rfoel/bulma-toast/issues/33
// https://www.youtube.com/watch?v=L3miLKtsgak
// https://www.webtutpro.com/solve-document-is-not-defined-errors-in-next-js-26fea778b868 
// The one below is the solution (using dynamic from Next.js)
// https://www.simplenextjs.com/posts/next-rich-editor-quill

export default function Editor() {
    const router = useRouter();
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
        router.push('/')
      }).catch((err) => {
        console.log(err)
        setError(err)
      })
    }

    //This isn't working well. Need to explore.
    return (
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
                  style={{height: "300px"}}
              />
              </div>
              {isError !== null && <div> {isError} </div>}
              <div className="mt-3">
              <button className="bg-blue-200 rounded-lg p-1 hover:bg-blue-400 px-4 py-1" type="submit">Submit</button>
              </div> 
          </div> 
      </form>
    )
}