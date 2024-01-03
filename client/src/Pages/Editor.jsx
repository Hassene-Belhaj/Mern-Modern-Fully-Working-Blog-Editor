import React, { useEffect } from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { Container } from '../Global/GlobalStyle';
import Blog_Editor from '../Components/Blog_Editor';
import { useState } from 'react';
import PublishForm from '../Components/PublishForm';
import { useEditorContext } from '../Context/EditorContext';
import AnimationWrapper from '../Utils/AnimationWrapper';
import { useParams } from 'react-router';
import axios from 'axios';
import { UrlBlog } from '../Utils/Url';

const Editor = () => {
  
    const {blog_id} =  useParams()
    // console.log(blog_id);

    const {isLoggedIn,CheckUserApi} =  useAuthContext()

    const {editorState , setEditorState , blog , setBlog} = useEditorContext()

    axios.defaults.withCredentials = true
    
    const get_single_blog_api = async () => {
      try {
        const {data} = await axios.post(UrlBlog + '/blog' , {blog_id})
        setBlog(data.resp)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
  if(!blog_id) {
    setBlog('')
  } else {
    get_single_blog_api()
  }  
  },[])


  // console.log(blog);


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