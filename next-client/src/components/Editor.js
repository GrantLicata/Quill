import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

export default function Editor() {
  const router = useRouter();
  const [isError, setError] = useState(null);
  const [note, setNote] = useState([]);
  
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
    <div className="m-6">
      <form onSubmit={addNote}>
        <div>
          <label className="font-bold">Title: </label>
          <input className="bg-slate-100 rounded-md pl-2" type="text" name="title" value={note.title} onChange={onChangeTitle} placeholder="Enter title" required />
        </div>
        <ReactQuill
          theme="snow"
          value={note.body}
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

      <div className='mt-4'>
        {note.map((item,index) => ( 
          <div key={index} className="my-2 rounded-lg border border-black-600 p-2">
            <h2 className='mb-2'><span className='font-bold'>Title:</span> {item.title}</h2>
            <div>
              <div className="mt-2">
                {parse(item.note)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

  //Document that may hold solution to document undefined error:
  // https://flaviocopes.com/error-document-not-defined/
  // https://github.com/rfoel/bulma-toast/issues/33
  // https://www.youtube.com/watch?v=L3miLKtsgak
  // https://www.webtutpro.com/solve-document-is-not-defined-errors-in-next-js-26fea778b868 
  // The one below is the solution (using dynamic from Next.js)
  // https://www.simplenextjs.com/posts/next-rich-editor-quill
  // https://dev.to/a7u/reactquill-with-nextjs-478b