import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Container } from '../Global/GlobalStyle';
import Blog_Editor from '../Components/Blog_Editor';
import { useState } from 'react';
import PublishForm from '../Components/PublishForm';
import { useEditorContext } from '../Context/EditorContext';

const Editor = () => {

 

  const {isLoggedIn,CheckUserApi} =  useAuthContext()
  const {editorState} = useEditorContext()


return (
    <Container>
       {editorState === 'editor' ? <Blog_Editor /> : < PublishForm />}
    </Container>
  )
}

export default Editor