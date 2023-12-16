import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Container } from '../Global/GlobalStyle';
import Blog_Editor from '../Components/Blog_Editor';
import { useState } from 'react';
import PublishForm from '../Components/PublishForm';
import { useEditorContext } from '../Context/EditorContext';
import AnimationWrapper from '../Utils/AnimationWrapper';

const Editor = () => {

 

  const {isLoggedIn,CheckUserApi} =  useAuthContext()
  const {editorState} = useEditorContext()


return (
    <Container>
      <AnimationWrapper initial={{ opacity : 0 }} animate={{ opacity : 1 }} exit={{opacity : 0}} 
      transition={{duration : 0.5}} key={editorState}>
       {editorState === 'editor' ? <Blog_Editor /> : < PublishForm />}
      </AnimationWrapper>
    </Container>
  )
}

export default Editor