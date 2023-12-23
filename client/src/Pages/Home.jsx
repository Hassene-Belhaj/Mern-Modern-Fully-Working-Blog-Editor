import React, { useEffect, useState } from 'react'
import { Button, Div, Title , Navlink, Container, Section, Span, Text, Header } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'
import axios from 'axios'
import { UrlBlog } from '../Utils/Url'
import LoadingSpinner from '../Utils/LoadingSpinner'
import BlogPostCard from '../Components/BlogPostCard'
import TrendingBlogs from '../Components/trendingBlogs'
import { FaArrowTrendUp } from "react-icons/fa6";
import styled from 'styled-components'
import HomeHeader from '../Components/HomeHeader'
import NoDataMessage from '../Utils/NoDataMessage'


const ArrowIcon = styled(FaArrowTrendUp)`
`


const Home = () => {
  
  const [toggle ,setToggle] = useState(true)
  
  const [blogs , setBlogs] = useState(null)

  const [pageState , setPageState] = useState(null)

  const [spinner , setSpinner] = useState(false)

  
   
const Categories =['Programming' , 'Hoolywood' , 'Film making' , 'Social media' , 'Cooking' , 'Tech' , 'Finance' , 'Travel'] 

  useEffect(()=>{

    const WindowResize =() => {
     if(window.innerWidth > 720) {
       setToggle(true)
    
     }
    //  if(window.innerWidth <= 720) {
    //   setPageState(null)
   
    // }
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

const handleSearchBlogApi =async () => {
  try {
    const resp = await axios.post(UrlBlog+'/search_blog', {tag : pageState},{withCredentials:true})
    setBlogs(resp.data.resp)
    if (resp.data.resp.length === 0) {
      setTimeout(() => { 
        setSpinner(false)
       }, 1000)
       setSpinner(true)
       setBlogs(null)
    }
  } catch (error) {
    console.log(error);
   
  }
}

useEffect(()=>{
  if(pageState === null) {
    handleLatestBlogApi()
  } else {
    handleSearchBlogApi()

  }
},[pageState])


const loadingBlogByTagCategory = (e) => {
  let category = e.target.innerText.toLowerCase()
  if(category === pageState) {
     setPageState(null)
     return ;
  }
  setPageState(category)
  setBlogs(null)
}

return ( 
    
<AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 

   <Container $display='flex'  $margin='auto'>
                {toggle === true ?

    <Section $SM_width='100%'>

           <Div $SM_width='100%'>
                <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} />
            </Div>
 
            {/* left columm */}
            <Div $padding='1rem'>
                <>
                {blogs ? 
                  <Div >
                      {blogs?.map((blogData,i)=>{
                        return (
                      <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                            <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {toggle}> 
                                <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                          </AnimationWrapper>   
                      </Navlink>
                        )
                      })}
                  </Div>
                :  
                <Div>
                  {spinner ? 
                   <LoadingSpinner  $padding='2rem 0'/> 
                  : 
                  <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                        <NoDataMessage message="No Blogs Published" />
                   </AnimationWrapper>   
                  
                  }
                 
                 
                </Div>
                }
                </>
                  </Div>
          </Section>
             
             :
             
             <Section>
              <Div>
                   <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} />
              </Div>
              
                  <Div $display='flex'> 
                        <Navlink $color='#000' $td='none' to={``} >
                               <TrendingBlogs />
                        </Navlink>
                  </Div>  
            </Section> 

}
              <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 
                    {/* right column */}
                  <Section  $SM_width='100%' $display='none' $LG_display='flex' $fd='column' $padding='2rem' $borderL='solid 1px rgba(0,0,0,0.2)'>
                        <Title $fs='1rem'>Stories From  All interest </Title>
                      
                        <Div $display='flex' $width='70%' $gap='1rem' $fw='wrap' $padding='2rem 0 0 0' >
                            {Categories.map((cat , i)=> {
                              return (
                                <Button key={i} onClick={loadingBlogByTagCategory} $width='auto' $padding='10px' $br='25px' $display='flex' $jc='center' $ai='center' $bg={cat.toLowerCase() === pageState ? '#000' : '#f3f5f9'} $color={cat.toLowerCase() === pageState ? '#fff' : '#000'} $border='none' $opacity='0.9' $transition='all ease-in-out 0.3s'>
                                  <Text $tt='capitalize' $outline='none' $fw='400'>{cat}</Text>
                              </Button>
                                )
                              })}
                        </Div>
                     
                       {blogs?  
                       <Div>
                        <Span $display='flex' $jc='start' $ai='center' $gap='.5rem' $margin='1rem 0 0 0' >
                          <Title $padding='1rem 0' $fw='200' $fs='1rem'>Trending</Title>
                          <ArrowIcon />
                        </Span>

                              <Div $width='100%' $margin='auto'>
                                    <Navlink  $color='#000' $td='none' to={``} > 
                                        <TrendingBlogs />
                                    </Navlink>                             
                              </Div>  
                       </Div>
                      :
                      <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                      <NoDataMessage message="No Blogs Published" />
                 </AnimationWrapper> 
                      
                      }
                      
                  </Section>
            </AnimationWrapper>
  </Container>
</AnimationWrapper>
  )
}

export default Home



