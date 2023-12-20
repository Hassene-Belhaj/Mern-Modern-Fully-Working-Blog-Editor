import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'


const EditorContextG = createContext()





const EditorContext = ({children}) => {


    const [editorState , setEditorState] = useState("editor")
    const [title , setTitle] = useState('')
    const [banner , setBanner] = useState(null)
    const [content , setContent] = useState('')
    const [desc , setDesc] = useState('')
    const [tags , setTags] = useState([])
    const [author , setAuthor] = useState({personnel_info : {}})
    const [error , setError] = useState('')

    const [textEditor , setTextEditor] = useState({isReady : false})

  
    const  value = {
      editorState , setEditorState , title , setTitle ,banner , setBanner ,content ,
      setContent , desc , setDesc , tags , setTags , author , setAuthor , error , setError ,
      textEditor , setTextEditor
    }




  return (
    <EditorContextG.Provider value={value}>
        {children}
    </EditorContextG.Provider>
  )
}


export default EditorContext ;
export const useEditorContext = () => useContext(EditorContextG)