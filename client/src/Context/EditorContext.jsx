import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'


const EditorContextG = createContext()



const blogStructure = {
    title : '' ,
    banner : '' ,
    content : '' ,
    tags : [] ,
    desc : '' ,
    author : {personnel_info : {} }
}



const EditorContext = ({children}) => {


    const [blog , setBlog] = useState(blogStructure)
    const [editorState , setEditorState] = useState("editor")



  return (
    <EditorContextG.Provider value={{blog , setBlog , editorState , setEditorState}}>
        {children}
    </EditorContextG.Provider>
  )
}


export const useEditorContext = () => useContext(EditorContextG)
export default EditorContext ;