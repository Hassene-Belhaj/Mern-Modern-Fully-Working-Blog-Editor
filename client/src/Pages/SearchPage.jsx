import React from 'react'
import { Container, Div, Navlink, Section, Span, Title } from '../Global/GlobalStyle'
import { useParams } from 'react-router'
import AnimationWrapper from '../Utils/AnimationWrapper'
import HomeHeader from '../Components/HomeHeader'
import { useState } from 'react'
import LoadingSpinner from '../Utils/LoadingSpinner'
import { useEffect } from 'react'
import axios from 'axios'
import { Filter_Pagination_Data } from '../Utils/Filter_pagination'
import { UrlBlog } from '../Utils/Url'
import BlogPostCard from '../Components/BlogPostCard'
import LoadMoreDataBtn from '../Utils/LoadMoreDataBtn'
import NoDataMessage from '../Utils/NoDataMessage'
import TrendingBlogs from '../Components/trendingBlogs'
import UsersCards from '../Components/UsersCards'
import { FaRegUser } from "react-icons/fa6";
import styled from 'styled-components'



const IconUser = styled(FaRegUser)`
`


const SearchPage = () => {




  const {query} =  useParams() 
//   console.log(query);
  const [toggle ,setToggle] = useState(true)
  const [blogs , setBlogs] = useState(null)
  const [users , setUsers] = useState(null)
  const [spinner , setSpinner] = useState(null)


  useEffect(()=>{
    const WindowResize = () => {
     if(window.innerWidth > 720) {
       setToggle(true)
     }
    } 
    window.addEventListener('resize' , WindowResize) ;
    return ()=> window.removeEventListener('resize' , WindowResize) 
    
  },[])  

//   const [spinner , setSpinner] = useState(false)

  const [pageState , setPageState] = useState(null)


  axios.defaults.withCredentials = true ;

  const handleSearchBlogApiBy_query=async({page = 1 , create_new_array}) => {
    try {
      const {data} = await axios.post(UrlBlog+'/search_blog', {query, page})
     
    if(!data.resp.length) {
      setTimeout(() => { setSpinner(false) }, 500)
      setSpinner(true)
    }
      const formateData = await Filter_Pagination_Data({
        state : blogs ,
        data : data.resp,
        page,
        data_to_send : {query} , 
        countRoute : '/blog_tag_count',
        create_new_array ,
      })
  
      setBlogs(formateData)
      
    } catch (error) {
      console.log(error);    
    }
  }


  const FetchUsersBlogs = async() => {
    try {
      const {data} = await axios.post(UrlBlog + '/search_users_blogs' , {query})
    if(!data.resp.length) {
      setTimeout(() => { setSpinner(false) }, 500)
      setSpinner(true)
    }
     console.log(data.resp);
     setUsers(data.resp)
    } catch (error) {
        console.log(error);
    }
  } 

  console.log(users);

  useEffect(()=>{
    setBlogs(null)  
    FetchUsersBlogs()
    handleSearchBlogApiBy_query({page : 1 , create_new_array : true})
  },[query])

//  console.log(blogs);
//  console.log(users);

  return (
<AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 


<Container $display='flex' $width='100vw' $padding='0 0 4rem 0'>
             {toggle === true ?       

// left columm
 <Section $flex='2' $SM_width='100%'> 
    <HomeHeader toggle={toggle} setToggle={setToggle} pageState={`search result ${query}`} title='Users Matched'  />     
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
                 //if no blogs data
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
             <LoadMoreDataBtn state={blogs} handleLatestBlogApi={handleSearchBlogApiBy_query} />              
 </Section>        

          :
          // mobile
  <Section $width='100%' $margin='auto'>
            <HomeHeader toggle={toggle} setToggle={setToggle} pageState={`search Result - ${query}`} title='Accounts Matched'  />     
            <Div  $width='90%' $margin='auto'>  
                            {users.length ?      
                              <UsersCards users={users}  /> 
                              : 
                              <>
                              {spinner ?  <LoadingSpinner  $padding='4rem'/> : <NoDataMessage  $margin='2rem auto' message='No Accounts Matched' /> }
                              </>
                              }
            </Div>     
  </Section> 
       }     
       
       {/* right column */}
               <Section $flex='1' $height='auto' $SM_width='90%' $display='none' $LG_display='flex' $fd='column' $padding='1rem' $borderL='solid 1px rgba(0,0,0,0.2)'>
                 <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={toggle}> 

                     <Div $display='flex' $ai='center' $gap='.5rem'>   
                        <Title $fs='1rem' $fw='400'> Users Related to Search </Title>
                        <IconUser  size='15'/>
                        </Div>
                    <Div>

                     {users?.length ?

                    <Div $width='100%' $margin='auto'>
                          <UsersCards users={users}  /> 
                          {/* <UsersCards users={users}  />  */}
                    </Div>  
                       :
                       <>
                         <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key= {blogs}> 
                              {spinner ? 
                              <LoadingSpinner $padding='4rem 0' /> 
                                :  
                              <NoDataMessage $margin='2rem auto' message='No Accounts Matched'/> } 
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

export default SearchPage