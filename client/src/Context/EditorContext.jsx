import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { UrlBlog } from '../Utils/Url'
import { useParams } from 'react-router'


const EditorContextG = createContext()


export const blogStructure = {
  title : "" ,
  desc : "" ,
  author: "" ,
  banner : "" ,
  tags : [] || null ,
  content : [] ,
  publishedAt : "" ,
}



const EditorContext = ({children}) => {



    const [blog , setBlog] = useState(blogStructure)
    const [editorState , setEditorState] = useState("editor")
    const [error , setError] = useState('')
    // const [textEditor , setTextEditor] = useState({isReady : false})

  

    const  value = {
      editorState , setEditorState , blog , setBlog , error , setError
    }




  return (
    <EditorContextG.Provider value={value}>
        {children}
    </EditorContextG.Provider>
  )

}


export default EditorContext ;
export const useEditorContext = () => useContext(EditorContextG)