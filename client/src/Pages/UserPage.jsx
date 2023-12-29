import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import { Url, UrlBlog } from '../Utils/Url';
import { useEffect } from 'react';
import { Button, Container, Div, Image, Navlink, Section, Text, Title } from '../Global/GlobalStyle';
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import AnimationWrapper from '../Utils/AnimationWrapper';
import { useAuthContext } from '../Context/AuthContext';
import AboutUser from '../Components/AboutUser';
import DateFormat from '../Utils/DateFormat';
import HomeHeader from '../Components/HomeHeader';
import { Filter_Pagination_Data } from '../Utils/Filter_pagination';
import BlogPostCard from '../Components/BlogPostCard';
import NoDataMessage from '../Utils/NoDataMessage';
import LoadMoreDataBtn from '../Utils/LoadMoreDataBtn';

const profile_data_structure = {
    personal_info : {
        fullname : "" ,
        username : "" ,
        profile_img : "" ,
        bio : "" ,
    } ,
    account_info : {
        total_posts : 0 ,
        total_reads : 0 ,  
    },
    social_links : {} ,
    joinedAt : ""
}

const UserPage = () => {

          const {isLoggedIn , CheckUserApi} =   useAuthContext()
        //   console.log(isLoggedIn?.data?.user.id); // _id from checkuser
          const {id : profileID} = useParams()
        //   console.log(profileID);

        const [profile , setProfile] = useState(profile_data_structure)
        const [loading ,setLoading] = useState(true)
        const [blogs ,setBlogs] = useState(null)
        const [spinner ,setSpinner] = useState(false)
        const [pageState ,setPageState] = useState('Blog Published')

        const {personal_info : {fullname , username , profile_img , bio } , account_info : {total_posts , total_reads} , social_links  , joinedAt , _id} = profile     
       
//   console.log(profile);

  
    axios.defaults.withCredentials = true

    const fetch_Profile_user = async () => {
        try {
            const {data} = await axios.post(Url+'/user',{username : profileID})
            setProfile(data.resp)
            handleSearchBlogApiByAuthor({user_id : data.resp._id})
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    } 
    
    
    const handleSearchBlogApiByAuthor=async({page = 1 , user_id}) => {
        try {
            const  {data} = await axios.post(UrlBlog+'/search_blog', {author : user_id , page})  
            setBlogs(data.resp)
            
        const formateData = await Filter_Pagination_Data({
        state : blogs ,
        data : data.resp,
        page,
        data_to_send : {author  : user_id} , 
        countRoute : '/blog_tag_count',
      })
      
      setBlogs(formateData)
      
    } catch (error) {
        console.log(error);
        
    }
}



    useEffect(()=>{  
    fetch_Profile_user()
    },[profileID])

  console.log(blogs);


        return (
                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={loading}  >
            <Container $display='flex' $width='100%'>
                    {loading ? 
                    <LoadingSpinner $padding='4rem 0'/>
                    :
                    <Text>
                        {/* Profile Page - {fullname} */}
                    </Text>
            }
                 <Section $XL_flex='2' $display='none' $MD_display='block'>
                        <HomeHeader pageState={pageState} toggle='true'/>

                        <Div >
                            {blogs?.results?.map((blogData,i)=>{
                            return (
                            <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} > 
                                    <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                                </AnimationWrapper>   
                            </Navlink>
                            )
                            })}
                                <LoadMoreDataBtn state={blogs} handleLatestBlogApi={handleSearchBlogApiByAuthor} />   
                        </Div >  
                        

                 </Section>

                 

                <Section $XL_flex='1' $MD_width='40%' $height='100vh' $width='100%' $padding='4rem 0' $margin='0 auto' $borderL='.5px solid rgba(0,0,0,0.2)'>
                    <Div $width='5rem' $height='5rem' $br='50%' $margin='0 auto'>
                        <Image $width='100%' $height='100%' $br='50%' src={profile_img} />
                    </Div>
                     <Title $ta='center' $margin='1rem'>@{fullname}</Title>
                     <Text $ta='center' $margin='1rem'>{fullname}</Text>

                     <Div $margin='auto'>
                        <Text $ta='center' $margin='1rem'>{total_posts.toLocaleString()} Posts - {total_reads.toLocaleString()} Reads</Text>
                        <Navlink to='/setting/edit_profile' $color='#000' $td='none'>
                         {isLoggedIn?.data?.user?.id === _id ?  <Button $display='flex' $jc='center' $margin='2rem auto' $padding='.5rem 1rem' $bg='transparent' $br='25px' >Edit Profile</Button>
                        :
                        null   
                        }    
                       
                        </Navlink>
                     </Div>
                     
                     <AboutUser social_links={social_links}  joinedAt={joinedAt}  />

                     <DateFormat joinedAt={joinedAt}  /> 

                     <Div $display='none' $2Xl_display='none' $Xl_display='none' $LG_display='none' $MD_display='none' $SM_display='block' $padding='2rem 0'>
                            {blogs?.results?.map((blogData,i)=>{
                            return (
                            <Navlink key={i} $color='#000' $td='none' to={`/blog/${blogData.blog_id}`} >
                                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} > 
                                    <BlogPostCard  data={blogData} author={blogData.author.personal_info} />
                                </AnimationWrapper>   
                            </Navlink>
                            )
                            })}
                                <LoadMoreDataBtn state={blogs} handleLatestBlogApi={handleSearchBlogApiByAuthor} />   
                        </Div >  
                        
                </Section>
                
            </Container>
                </AnimationWrapper>
        )
        }

        export default UserPage