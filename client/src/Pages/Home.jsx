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


const ArrowIcon = styled(FaArrowTrendUp)`
`

const Home = () => {

  const Categories =['Programming' , 'Hoolywood' , 'Film making' , 'Social media' , 'Cooking' , 'Tech' ,'Test', 'Finance' , 'Travel'] 
  
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
      const formateData = await Filter_Pagination_Data({
      state : blogs ,
      data : data.resp,
      page,
      countRoute : '/all_blogs_count'
    })
    // console.log(formateData);
    setBlogs(formateData)    
    } catch (error) {
      console.log(error);
    }
  }
  


const handleSearchBlogApiByTag =async({page = 1}) => {
  try {
    const {data} = await axios.post(UrlBlog+'/search_blog', {tag : pageState , page})

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

useEffect(()=>{
 RefScroll.current.scrollIntoView({block : 'end' , behavior : 'smooth'})
},[blogs])




return ( 
    
<AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 
  
   <Container $display='flex' $width='100vw'>
                {toggle === true ?

            //  {/* left columm */}
    <Section $flex='2' $SM_width='100%' ref={RefScroll}> 

           <Div $SM_width='100%'>
                <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} />
            </Div>
 
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
                       {/* {spinner ?  */}
                       <LoadingSpinner $padding='4rem 0' />
                        : 
                        {/* <NoDataMessage message="No Blogs Published" /> } */}
                   </AnimationWrapper>   

                </Div>
                }
                </>
                  </Div>
               
                <LoadMoreDataBtn state={blogs} handleLatestBlogApi={ (pageState === null ? handleLatestBlogApi : handleSearchBlogApiByTag )} />
                
                </Section>
             
             :
              // mobile trendingblogs
             <Section $width='100%' $margin='auto'>
              <Div>
                   <HomeHeader toggle={toggle} setToggle={setToggle} pageState={pageState} />
              </Div>             
                  <Div $width='80%' $margin='auto'>  
                        <Navlink $color='#000' $td='none' to={``} >
                               <TrendingBlogs />
                        </Navlink>
                  </Div>     
            </Section> 
          }     
                    {/* right column */}
                  <Section $flex='1' $height='auto' $SM_width='90%' $display='none' $LG_display='flex' $fd='column' $padding='1rem' $borderL='solid 1px rgba(0,0,0,0.2)'>
              <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 
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
                        
                       <Div>
                        <Span $display='flex' $jc='start' $ai='center' $gap='.5rem' $margin='1rem 0 0 0' >
                          <Title $padding='1rem 0' $fw='200' $fs='1rem'>Trending</Title>
                          <ArrowIcon />
                        </Span>

                        {blogs?.results.length ?
                              <Div $width='90%' $margin='auto'>
                                    <Navlink  $color='#000' $td='none' to={``} > 
                                    <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {toggle}> 
                                        <TrendingBlogs />
                                   </AnimationWrapper> 
                                    </Navlink>                             
                              </Div>  
                          :
                          <>
                            <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                            {/* {spinner ?  */}
                            <LoadingSpinner $padding='4rem 0' /> 
                            {/* :  */}
                            {/* <NoDataMessage message="No Blogs Published" /> } */}

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



