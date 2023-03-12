import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

// The ReactQuill component is imported as a non-server side component through the dynamic hook. This helps to prevent breakdown of editor functionality following a post.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor() {
  const [isError, setError] = useState(null);
  const [note, setNote] = useState([])
  const [draft, setDraft] = useState([{
    title: '',
    body: '',
  }]);

  // The useRouter hook replaces useNavigate for Next.js applications.
  const router = useRouter();
  
  // Handle changes to the draft title when interacting with the editor.
  const onChangeTitle = (e) => {
    setDraft({
      ...draft, [e.target.name]:e.target.value
    });
  } 
  
  // Handle changes to the body title when interacting with the editor.
  const onChangeBody = (value) => {
    console.log(value)
    setDraft({
      ...draft, body:value
    });
  } 

  // Removes deleted notes from the note list.
  const removeNoteFromList = (noteID) => {
    setNote(note.filter(note => note._id !== noteID));
  }
  
  // Adds a new note to the database and refreshes the application page.
  const addNote = (e) => {
    e.persist();
    axios.post(`http://localhost:8000/api/addNote`, {
      title: draft.title,
      body: draft.body,
    }).then((res) => {
      console.log("Successful note entry", res)
      router.push('/')
    }).catch((err) => {
      console.log(err)
      setError(err)
    })
  }

  // Removes a note from the database and triggers the removal of the note form our note list.
  const deleteNote = (noteID) => {
    axios.delete(`http://localhost:8000/api/delete/${noteID}`)
    .then((res) => {
      console.log("Record deleted", res)
      removeNoteFromList(noteID)
      router.push('/')
    }).catch((err) => {
      console.log(err)
      setError(err)
    })
  }

  // All notes are gathered from the database upon initial render of the Editor component.
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
      {/* Note Creation Form */}
      <form onSubmit={addNote}>
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

      {/* List of Notes */}
      <div className='mt-4'>
        {note.map((item,index) => (
          <div key={index} className="my-2 rounded-lg border border-black-600 p-2">
            <h2 className='mb-2'><span className='font-bold'>Title:</span> {item.title}</h2>
            <div className="mt-2">
              {parse(item.body)}
            </div>
            <div className="pt-4">
              <button className="bg-slate-200 rounded-lg p-1 hover:bg-slate-400 px-4 py-1 mr-2" type="submit">Edit</button>
              <button 
                className="bg-red-200 rounded-lg p-1 hover:bg-red-400 px-4 py-1" 
                type="submit"
                onClick={(e) => deleteNote(item._id)}
                >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

  //References for development of the editor:
  // https://flaviocopes.com/error-document-not-defined/
  // https://github.com/rfoel/bulma-toast/issues/33
  // https://www.youtube.com/watch?v=L3miLKtsgak
  // https://www.webtutpro.com/solve-document-is-not-defined-errors-in-next-js-26fea778b868 
  // The one below is the solution (using dynamic from Next.js)
  // https://www.simplenextjs.com/posts/next-rich-editor-quill
  // https://dev.to/a7u/reactquill-with-nextjs-478b