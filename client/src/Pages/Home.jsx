import React, { useEffect, useRef, useState } from 'react'
import { Button, Div, Title , Navlink, Container, Section, Span, Text, Header } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'
import { UrlBlog } from '../Utils/Url'
import LoadingSpinner from '../Utils/LoadingSpinner'
import BlogPostCard from '../Components/BlogPostCard'
import TrendingBlogs from '../Components/trendingBlogs'
import { FaArrowTrendUp } from "react-icons/fa6";
import styled from 'styled-components'
import HomeHeader from '../Components/HomeHeader'
import NoDataMessage from '../Utils/NoDataMessage'
import { Filter_Pagination_Data} from '../Utils/Filter_pagination'
import LoadMoreDataBtn from '../Utils/LoadMoreDataBtn'
import axios from 'axios'
import Categories from '../Components/Categories'


const ArrowIcon = styled(FaArrowTrendUp)`
`

const Home = () => {

 
  
  const [toggle ,setToggle] = useState(true)
  
  const [blogs , setBlogs] = useState(null)

  const [spinner , setSpinner] = useState(false)

  const [pageState , setPageState] = useState(null)




  useEffect(()=>{
    const WindowResize = () => {
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
  
     
  //

  axios.defaults.withCredentials = true


  const handleLatestBlogApi = async ({page=1}) => {
    try { 
      const {data} = await axios.post(UrlBlog+'/latest_blog',{page})
           
    if(!data.resp.length) {
      setTimeout(() => { setSpinner(false) }, 500)
      setSpinner(true)
    }

      const formateData = await Filter_Pagination_Data({
      state : blogs ,
      data : data.resp,
      page,
      countRoute : '/all_blogs_count'
    })
    setBlogs(formateData)    
    } catch (error) {
      console.log(error);
    }
  }
  


const handleSearchBlogApiByTag =async({page = 1}) => {
  try {
    const {data} = await axios.post(UrlBlog+'/search_blog', {tag : pageState , page})
    
         
    if(!data.resp.length) {
      setTimeout(() => { setSpinner(false) }, 500)
      setSpinner(true)
    }


    const formateData = await Filter_Pagination_Data({
      state : blogs ,
      data : data.resp,
      page,
      data_to_send : {tag  : pageState} , 
      countRoute : '/blog_tag_count'
    })

    setBlogs(formateData)

  } catch (error) {
    console.log(error);
   
  }
}




const loadingBlogByTagCategory = (e) => {
  let category = e.target.innerText.toLowerCase()
  if(category === pageState) {
    setPageState(null)
    setBlogs(null)
    return ;
  }
  setPageState(category)
  setBlogs(null)
}


useEffect(()=>{
  if(pageState === null) {
    handleLatestBlogApi({page:1})
  } else {
    handleSearchBlogApiByTag({page:1})
  }
},[pageState])



const RefScroll =useRef(null)

// useEffect(()=>{
//  RefScroll.current.scrollIntoView({block : 'end' , behavior : 'smooth'})
// },[blogs])




return ( 
    
<AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 


  <Container $display='flex' $width='100vw' $padding='0 0 4rem 0'>
    
                {toggle === true ?       

// left columm
            <Section $flex='2' $SM_width='100%' ref={RefScroll}> 
                <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} title='TrendingBlogs'  />     
                    <Div>
                          <>
                            {blogs?.results.length ? 

                            <Div >
                                {blogs?.results?.map((blogData,i)=>{
                                  return (
                                <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                                      <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {toggle}> 
                                          <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                                    </AnimationWrapper>   
                                </Navlink>
                                  )
                                })}
                              </Div >  

                            :  
                            <Div>
                            <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                                  {spinner ? 
                                  <LoadingSpinner $padding='4rem 0' />
                                  : 
                                  <NoDataMessage $margin='2rem auto' message="No Blogs Published" /> }
                              </AnimationWrapper>   

                            </Div>
                            }
                          </>
                    </Div>           
                        <LoadMoreDataBtn state={blogs} handleLatestBlogApi={ (pageState === null ? handleLatestBlogApi : handleSearchBlogApiByTag )} />              
            </Section>   

             :

          <Section $width='100%' $margin='auto'>
          
                    <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} title='TrendingBlogs'  />     
                    <Div  $width='90%' $margin='auto'>  
                          <Navlink $color='#000' $td='none' to={``} >
                                  <TrendingBlogs  />
                          </Navlink>
                    </Div>     

          </Section> 

          }     
          
          {/* right column */}

              <Section $flex='1' $height='auto' $SM_width='90%' $display='none' $LG_display='flex' 
              $fd='column' $padding='1rem' $borderL='solid 1px rgba(0,0,0,0.2)'>
                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 
                    <Title $fs='1rem' $fw='400'>Stories From  All interest </Title>
                    <Categories loadingBlogByTagCategory={loadingBlogByTagCategory} pageState={pageState}/>
                    
                  <Div>
                    <Span $display='flex' $jc='start' $ai='center' $gap='.5rem' $margin='1rem 0 0 0' >
                      <Title $padding='1rem 0' $fw='200' $fs='1rem'>Trending</Title>
                      <ArrowIcon />
                    </Span>

                    {blogs?.results.length ?

                          <Div $width='90%' $margin='auto'>
                                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {toggle}> 
                                    <TrendingBlogs />
                              </AnimationWrapper> 
                          </Div>  
                      :
                      <>
                        <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                        {spinner ? 
                        <LoadingSpinner $padding='4rem 0' /> 
                          : 
                        <NoDataMessage message="No Blogs Published" /> } 
                        </AnimationWrapper>   
                      </>

                  }

                  </Div>
                    
                </AnimationWrapper>
              </Section>  
  </Container>
</AnimationWrapper>
  )
}

export default Home



