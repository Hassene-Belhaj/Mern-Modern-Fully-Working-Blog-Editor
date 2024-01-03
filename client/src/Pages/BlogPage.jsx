import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import { UrlBlog } from '../Utils/Url';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Div, Image, Navlink, Text, Title } from '../Global/GlobalStyle';
import AnimationWrapper from '../Utils/AnimationWrapper';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { CiHeart } from "react-icons/ci";
import { LiaCommentDots } from "react-icons/lia";
import { FaTwitter } from "react-icons/fa";
import styled from 'styled-components';
import { useAuthContext } from '../Context/AuthContext';
import BlogPostCard from '../Components/BlogPostCard';


const IconHeart = styled(CiHeart)``
const IconComment = styled(LiaCommentDots)``
const IconTwitter= styled(FaTwitter)`
cursor: pointer;
transition: all ease-in-out 0.3s;
&:hover {
  color : #1DA1F2;
}
`

const Content = styled.div`
display: flex;
flex-direction: column;
gap:1rem;
padding: 2rem 0;
line-height: 2rem;
h1 {
  text-align: center;
  font-size: 2rem ;
}

h2{
  font-size: 1.8rem;
}
h3{
  font-size: 1.6rem;
}
h4{
  font-size: 1.4rem;
}
`



export const blogStructure = {
  activity : {total_likes : "" , total_comments : "" , total_reads : ""} ,
  author : {personal_info : {fullname:"", email:"", username:"" , profile_img: "" ,  }  , _id : ""} ,
  banner : "" ,
  content : [] ,
  desc : "" ,
  title : "" ,
  publishedAt : "" ,
}


const BlogPage = () => {

  
  const {isLoggedIn} =  useAuthContext()
  // console.log(isLoggedIn?.data.user.id);
  
  const {id :  blog_id} = useParams()
  // console.log( blog_id );
  const [blog , setBlog] = useState(blogStructure)
  const [spinner , setSpinner ] = useState(true)
  const [similarBlogs , setSimilarBlogs ] = useState(null)
  
  
  const {title , desc , banner , content , publishedAt , author : {personal_info : {fullname , email, username, profile_img  } , _id  }
  , activity : {total_likes , total_comments , total_reads }} = blog
  
  // console.log(isLoggedIn?.data.user.id);
  // console.log(_id);
  // console.log(tags[0]);
  
  console.log(similarBlogs);
    
    axios.defaults.withCredentials = true
    
    const get_single_blog_api = async () => {
      try {
        const {data} = await axios.post(UrlBlog + '/blog' , {blog_id})
        setBlog(data.resp)
        setSpinner(false)
        // console.log(data.resp.tags[0]);
        try {
          console.log(data.resp.tags[0]);
          const resp_similar_blogs = await axios.post(UrlBlog+'/search_blog', {tag : data.resp.tags[0] , limit : 6 , eliminate_blog : blog_id} )
          setSimilarBlogs(resp_similar_blogs.data.resp)  ;
          console.log(resp_similar_blogs.data) ;
      } catch (error) {
        console.log(error);
      }
      
      
    } catch (error) {
      console.log(error);
      setSpinner(false)
    }
  }
  
  useEffect(()=>{
    get_single_blog_api()
  },[]) 
  
  // console.log(similarBlogs[0]?.blog);
  // console.log(content);
  
    return (
      <AnimationWrapper>
    {spinner ?
     <LoadingSpinner $padding='8rem 0'  />
     :
     <Container $width='70%' $margin='auto' >

      <Div  $display='flex' $maxwidth='1200px' $height='600px'  $margin='.5px auto' $br='5px' $padding='4rem 0 0 0'>
          <Image $width='100%' $height='100%' $of='cover' src={banner}  $br='5px' />
      </Div>
      <Title $XL_fs='4rem' $LG_fs='3rem' $SM_fs='2rem' $XS_fs='1.5rem'  $padding='4rem' $ta='center'>{title}</Title>

    <Div $width='100%' $display='flex' $jc='space-between' $ai='center'>
      <Div $padding='2rem 0' $display='flex' $ai='center'  $gap='1rem' >
          <Div  $width='1.5rem' $height='1.5rem'  $br='25px'>
            <Image $width='100%' $height='100%' src={profile_img} $br='25px' />
          </Div>
            <Text $fw='600' $fs='0.8rem'>@{fullname}</Text>
            <Text $fw='600' $fs='0.8rem'>{fullname}</Text>
      </Div>

          <Div>
              <Text $fw='600' $width='auto' $fs='0.8rem'><strong> Published on</strong> {new Date(publishedAt).toString().slice(0,15)}</Text>
        </Div> 
    </Div>

    
     <Div $display='flex' $jc='space-between' $ai='center' $borderT='.5px solid rgba(0,0,0,0.1)' $borderB='.5px solid rgba(0,0,0,0.1)'>
      <Div $padding='1rem 0' $display='flex' $gap='2rem'  >
        <Button $display='flex' $jc='center' $ai='center' $padding='4px' $bg='#f3f5f9' $border='none' $outline='none' $br='5px'>
           <IconHeart size={20}/>
        </Button>
        <Text>{total_likes}</Text>
        <Button $display='flex' $jc='center' $ai='center' $padding='4px' $bg='#f3f5f9' $border='none' $outline='none' $br='5px'>
           <IconComment size={20}/>
        </Button>
        <Text>{total_comments}</Text>
      </Div>
       <Div $display='flex' $ai='center' $gap='2rem'>
           {isLoggedIn?.data.user.id === _id ? 
           <Navlink to={`/editor/${blog_id}`} $color='#000' $td='none'>
             <Button $display='flex' $jc='center' $margin='2rem auto' $padding='.5rem 2rem' $bg='transparent' $br='25px' >Edit</Button> 
           </Navlink>
           : '' }
        <Navlink to={`https://www.twitter.com/intent/tweet?text=Read${title}&url=${location.href}`} target='_blank' $td='none' $color='#000'>
           <IconTwitter size={20} />
        </Navlink>
       </Div>

     </Div>
       

       <Content dangerouslySetInnerHTML={{__html : content}}>

       </Content>


        <Div $padding='1rem 0'>
          {similarBlogs?.length ?
           <Title $fs='1.2rem' $fw='600'>Similar Blogs</Title>
           :
           null
          }
          </Div > 
        <Div $width='100%' $padding='0 0 4rem 0'>
            {similarBlogs?.map((blogData,i)=>{
              return (
                <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} target='_blank' >
                      <AnimationWrapper key={i} initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} > 
                          <BlogPostCard  data={blogData} author={blog.author.personal_info} widthCss='100%' paddingCss='2rem 0'/>
                    </AnimationWrapper>   
                </Navlink>
              )
            })}
      </Div>
        
    </Container>
    }
  </AnimationWrapper>  
  )
}

export default BlogPage