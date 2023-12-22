import React, { useEffect, useState } from 'react'
import { Button, Div, Title , Navlink, Container, Section, Span, Text } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'
import axios from 'axios'
import { UrlBlog } from '../Utils/Url'
import LoadingSpinner from '../Utils/LoadingSpinner'
import BlogPostCard from '../Components/BlogPostCard'
import TrendingBlogs from '../Components/trendingBlogs'
import { FaArrowTrendUp } from "react-icons/fa6";
import styled from 'styled-components'


const ArrowIcon = styled(FaArrowTrendUp)`
`


const Home = () => {
  
  const [toggle ,setToggle] = useState(true)
  
  const [blogs , setBlogs] = useState(null)

  const [buttonBg , setButtonBg] = useState(null)

  
   
const Categories =['Programming' , 'Hoolywood' , 'Film making' , 'Social media' , 'Cooking' , 'Tech' , 'Finances' , 'Travel'] 

  useEffect(()=>{

    const WindowResize =() => {
     if(window.innerWidth > 720) {
       setToggle(true)
     }
    } 
        
    window.addEventListener('resize' , WindowResize) ;
      
    
    return ()=> window.removeEventListener('resize' , WindowResize) 
    
    
  },[])
  
    
    
    const handleLatestBlogApi =async () => {
      try {
        const resp = await axios.get(UrlBlog+'/latest_blog',{withCredentials:true})
        // console.log(resp.data);
        setBlogs(resp.data.resp)
      } catch (error) {
        console.log(error);
       
      }
}




useEffect(()=>{
  handleLatestBlogApi()
},[])


const loadingBlogByTagCategory = (e) => {
  let category = e.target.innerText.toLowerCase()
  console.log(category);
  setButtonBg(category)
}

return ( 
    <Container $display='flex' >

        <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>   

         <Div >

              <Div $display='flex' $gap='2rem' $jc='center'  $MD_jc='start'  $ai='center' $width='90%'  $height='80px' $padding='2rem 2rem'  $margin='auto' $borderB='solid 1px rgba(0,0,0,0.2)'>  

                    <Div onClick={()=>setToggle(true)}  $borderB={toggle ? 'solid 2px rgba(0,0,0,1)' : null} $height='80px'   $cursor='pointer' >
                      <Button $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' >Home</Button>
                    </Div>

                    <Div $MD_display='none' onClick={()=>setToggle(false)}  $borderB={toggle ? null : 'solid 2px rgba(0,0,0,1)'} $height='80px'   $cursor='pointer' >
                      <Button $width='8rem' $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' >Trending Blogs</Button>
                    </Div>
              </Div>
    </Div>
                
                {toggle === true ?

            <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>  

                  <Div $padding='1rem ' $flex='1'   $width={blogs ? '100%' : '660px'}>
                    <>
                    {blogs ? 
                      <Div >
                          {blogs?.map((blogData,i)=>{
                            return (
                              <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                                  <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                              </Navlink>
                            )
                          })}
                      </Div>
                    :
                    <LoadingSpinner  $padding='5rem 0'/> }
                    </>
                  </Div>
          
                  </AnimationWrapper>
             
                  :

                  <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>  
                      <Div $padding='1rem'>
                    
                            <Navlink $color='#000' $td='none' to={``} >
                                <TrendingBlogs />
                            </Navlink>
                     
                      </Div>  
                  </AnimationWrapper>
              }

        </AnimationWrapper>

              <Div $display='none' $XL_display='flex' $fd='column'   $padding='1rem' $margin='.2rem 0 0 0' $borderL='solid 1px rgba(0,0,0,0.2)'>
                <Title $fs='1rem'>Stories From  All interest </Title>
               
                <Div $display='flex' $gap='1rem' $fw='wrap' $padding='1rem 0 0 0' $width='600px'>
                  {Categories.map((cat , i)=> {
                    return (
                      <Button key={i} onClick={loadingBlogByTagCategory} $width='auto' $padding='10px' $br='25px' $display='flex' $jc='center' $ai='center' $bg={cat.toLowerCase() === buttonBg ? '#000' : '#f3f5f9'} $color={cat.toLowerCase() === buttonBg ? '#fff' : '#000'} $border='none' $opacity='0.9' $transition='all ease-in-out 0.3s'>
                        <Text $tt='capitalize' $outline='none' $fw='400'>{cat}</Text>
                    </Button>
                      )
                  })}
                </Div>

                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}>  

                <Span $display='flex' $jc='start' $ai='center' $gap='.5rem' $margin='1rem 0 0 0' >
                   <Title $padding='1rem 0' $fw='200' $fs='1rem'>Trending</Title>
                   <ArrowIcon />
                </Span>

                      <Div>
                            <Navlink  $color='#000' $td='none' to={``} > 
                                <TrendingBlogs />
                            </Navlink>
                      
                      </Div>  
                  </AnimationWrapper>
              </Div>

           </Container>
  )
}

export default Home



