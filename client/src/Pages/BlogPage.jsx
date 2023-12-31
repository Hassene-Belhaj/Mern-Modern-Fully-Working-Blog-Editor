import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import { UrlBlog } from '../Utils/Url';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Div, Image, Text, Title } from '../Global/GlobalStyle';
import AnimationWrapper from '../Utils/AnimationWrapper';
import LoadingSpinner from '../Utils/LoadingSpinner';


export const blogStructure = {
  title : "" ,
  desc : "" ,
  banner : "" ,
  content : [] ,
  tags : [] ,
  publishedAt : "" ,
  author : {personal_info : {fullname:"", email:"", username:"" , profile_img: ""} } ,
  activity : {total_likes : "" , total_comments : "" , total_reads : ""}
}


const BlogPage = () => {
  const {id :  blog_id} = useParams()
  // console.log( blog_id );
  const [blog , setBlog] = useState(blogStructure)
  const [spinner , setSpinner ] = useState(true)

  const {title , desc , banner , content , tags , publishedAt , author : {personal_info : {fullname , email, username, profile_img} } , activity : {total_likes , total_comments , total_reads }} = blog


console.log(blog);
axios.defaults.withCredentials = true

const get_single_blog_api = async () => {
  try {
    const {data} = await axios.post(UrlBlog + '/blog' , {blog_id})
    console.log(data.resp);
    setBlog(data.resp)
    setSpinner(false)
  } catch (error) {
    console.log(error);
    setSpinner(false)
  }
}



useEffect(()=>{
  get_single_blog_api()
},[])


  return (
  <AnimationWrapper>
    {spinner ?
     <LoadingSpinner $padding='8rem 0'  />
     :
    <Container $width='80%' $margin='auto' >

      <Div $display='flex' $maxwidth='800px' $height='400px'  $margin='auto'>
        <Image $width='100%' $height='100%' $of='cover' src={banner} />
      </Div>
      <Title $padding='4rem' $ta='center'>{title}</Title>

     <Div $display='flex' $ai='center'  $gap='1rem' >
        <Div  $width='1.5rem' $height='1.5rem'  $br='25px'>
          <Image $width='100%' $height='100%' src={profile_img} $br='25px' />
        </Div>
          <Title $fs='0.8rem'>{fullname}</Title>
          <Title $fs='0.8rem'>@{fullname}</Title>
          <Text $width='auto' $fs='0.8rem'><strong> Published on</strong> {new Date(publishedAt).toString().slice(0,15)}</Text>
          <Div>
            
          </Div>
     </Div>
        
    </Container>
    }
  </AnimationWrapper>  
  )
}

export default BlogPage