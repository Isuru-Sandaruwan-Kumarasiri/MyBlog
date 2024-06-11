import React, { createContext, useContext, useState } from 'react'
import {UserContext} from "../App"
import { Navigate } from 'react-router-dom';
import BlogEditor from '../Components/BlogEditor';
import PublishForm from '../Components/PublishForm';



const blogStructure={
  title:'',
  banner:'',
  content:'',
  tags:'',
  des:'',
  author:{personal_info:{}}


}

export const EditorContext=createContext({ })


function Editor() {

  const [blog,setBlog]=useState(blogStructure);
  
    let {userAuth:{access_token}}=useContext(UserContext);


    const [editorState,setEditorState]=useState("editor");


  return (
    <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState}}>
      {
          access_token==null ? <Navigate to='/signin'/>
          :editorState=="editor"? <BlogEditor/>: <PublishForm/>
      }
    </EditorContext.Provider>
  )
}

export default Editor