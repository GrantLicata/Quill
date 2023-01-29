import React,{useState} from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Editpost(props) {
  let history = useNavigate();
  const [userInfo, setUserInfo] = useState({
    title: props.postList[0].title,
    description: props.postList[0].description,
    information: props.postList[0].information,
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
  const PoemAddbooks = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if(userInfo.description.length < 50){
        setError('Required, Add description minimum length 50 characters');
        return;
      }
      axios.post(`http://localhost:8080/editArticle`, {
        title: userInfo.title,
        description: userInfo.description,
        information: userInfo.information,
        ids:props.editPostID
      })
      .then(res => { // then print response status
        if(res.data.success === true){
          history.push('/');
        }
      })
    } catch (error) { throw error;}    
  }
return (
  <> 
    <form onSubmit={PoemAddbooks}>
      <h3> Edit   </h3>
      <div>
        <div>
          <label> Title <span> * </span> </label>
          <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} placeholder="Title" required />
        </div>
        <div>
          <label> Description <span> * </span> </label>
          <EditorToolbar toolbarId={'t1'} />
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
          <div>
            <label> Additional Information </label>
            <EditorToolbar toolbarId={'t2'} />
          <ReactQuill
            theme="snow"
            value={userInfo.information}
            onChange={onInformation}
            placeholder={"Write something awesome..."}
            modules={modules('t2')}
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
export default Editpost