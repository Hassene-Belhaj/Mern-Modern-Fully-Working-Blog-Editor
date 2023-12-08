import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Container } from '../Global/GlobalStyle';
import Blog_Editor from '../Components/Blog_Editor';
import { useState } from 'react';

const Editor = () => {
  const [editorState , setEditorState] = useState('editor')
  const {isLoggedIn} =  useAuthContext()
  const navigate =useNavigate()

useEffect(()=>{
if(isLoggedIn === undefined){
  navigate('/signin')
}
},[])


return (
  <>
   <Container>
      {editorState === 'editor' ? <Blog_Editor /> : < PublicKeyCredential/>}

   </Container>
  </>
  )
}

export default Editor