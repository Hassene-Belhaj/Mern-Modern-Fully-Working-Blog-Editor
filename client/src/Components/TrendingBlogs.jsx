import React, { useState } from 'react'
import { Container, Div, Image, Text, Title } from '../Global/GlobalStyle'
import { useEffect } from 'react';
import axios from 'axios';
import { UrlBlog } from '../Utils/Url';
import LoadingSpinner from '../Utils/LoadingSpinner';




const TrendingBlogs = () => {

    const [trendingBlogs , setTrendingBlogs] = useState(null)

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
        handleTrendingApi()
      },[])

      
  if(!trendingBlogs) return <Div $padding='2rem 0'><LoadingSpinner /></Div> 
  else {

    return (
      <>
       {trendingBlogs?.map(({publishedAt, title, desc, author : {personal_info : {fullname , profile_img}}} , i)=> {
         return (
           <Container key={i} $padding='2rem'  $width='90%' $display='flex' $gap='2rem'  $margin='auto'  $borderB='.5px solid rgba(0,0,0,0.2)'>

                    <Div  $display='flex' $ai='center' >
                            <Title $fs='4rem' $fw='100'  $color='rgba(0,0,0,0.1)'>0{i+1}</Title>
                    </Div>

              <Div>

                    <Div $display='flex' $gap='1rem' $margin='0 auto'>
                            <Div $width='1.5rem' $height='1.5rem' $display='flex' $ai='center' >
                                <Image $width='1.5rem' $heigth='1.5rem' $of='cover' $br='25px' src={profile_img} />
                            </Div>
                            <Div $display='flex' $gap='1rem' $ai='center'>
                                    <Text $fs='0.9rem'>@{fullname}</Text>
                                    <Text $fs='0.9rem'>{new Date(publishedAt).toString().slice(0,10)}</Text>
                            </Div>  
                    </Div>


                    <Div $display='flex' $jc='space-between' $fd='column' $margin='auto'>

                        <Div $height='100%' $display='flex' $fd='column'  $padding='1rem 0' >
                            <Title $fs='1.3rem' $tt='capitalize'>{title}</Title>
                        </Div>

                    </Div>   

              </Div>  
                        

        </Container> 
        )
       })}
 
       
    </>
    )
  }
}

export default TrendingBlogs