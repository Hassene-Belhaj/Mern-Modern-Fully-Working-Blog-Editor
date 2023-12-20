import React, { useEffect, useState } from 'react'
import { Button, Div, Title , Navlink } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'
import axios from 'axios'
import { UrlBlog } from '../Utils/Url'
import LoadingSpinner from '../Utils/LoadingSpinner'
import BlogPostCard from '../Components/BlogPostCard'
import TrendingBlogs from '../Components/trendingBlogs'

const Home = () => {
  const [toggle ,setoggle] = useState(true)
  const [blogs , setBlogs] = useState(null)
  const [trendingBlogs , setTrendingBlogs] = useState(null)


const handleLatestBlogApi =async () => {
  try {
    const resp = await axios.get(UrlBlog+'/latest_blog',{withCredentials:true})
    console.log(resp.data);
    setBlogs(resp.data.resp)
  } catch (error) {
    console.log(error);
  }
}



const handleTrendingApi = async() => {
  try {
    const resp = await axios.get(UrlBlog+'/trending_blogs' , {withCredentials : true})
    console.log(resp);
    setTrendingBlogs(resp.data.resp)
  } catch (error) {
    console.log(error);
  }
}



useEffect(()=>{
handleLatestBlogApi()
handleTrendingApi()
},[])


  return ( 
    <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>   

        <Div  $width='90%' $margin='auto' $display='flex'  $gap='4rem' $jc='center' $jcLg='start'  $ai='center'  $height='80px' $padding='2rem 4rem' $borderB='solid 1px rgba(0,0,0,0.2)'>  
          <Div onClick={()=>setoggle(true)}  $borderB={toggle ? 'solid 2px rgba(0,0,0,1)' : null} $height='80px'   $cursor='pointer' >
            <Button $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' >Home</Button>
          </Div>
          <Div $Lg='none' onClick={()=>setoggle(false)}  $borderB={toggle ? null : 'solid 2px rgba(0,0,0,1)'} $height='80px'   $cursor='pointer' >
            <Button $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' >Trending Blogs</Button>
          </Div>
        </Div>
            
            {toggle === true ?
             <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>  
              <Div $padding='1rem '>
                <>
                 {blogs ? 
                   <Div>
                    {blogs?.map((blogData,i)=>{
                      return (
                        <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                            <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                        </Navlink>
                      )
                    })}
                   </Div>
                
                 
                 
                 
                 
                 
                 :
                  <LoadingSpinner  $padding='2rem 0'/> }
                </>
               </Div>
               </AnimationWrapper>
              :
              <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>  
                  <Div $padding='2rem'>
                  <Div>
                    {trendingBlogs?.map((trendingBlogsData,i)=>{
                      return (
                        <Navlink key={i} $color='#000' $td='none' to={``} >
                            <TrendingBlogs data={trendingBlogsData} author={trendingBlogsData.author.personal_info} i={i}/>
                        </Navlink>
                      )
                    })}
                   </Div>
                  </Div>  
              </AnimationWrapper>
           }
       
        
    </AnimationWrapper>
  )
}

export default Home



