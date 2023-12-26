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
           <Container key={i} $padding='1rem'  $width='100%' $display='flex' $jc='start' $ai='center' $gap='2rem'  $margin='auto'  $borderB='.5px solid rgba(0,0,0,0.2)'>

                    <Div  $display='flex' $ai='start' >
                            <Title $fs='4rem' $fw='100'  $color='rgba(0,0,0,0.1)'>0{i+1}</Title>
                    </Div>

              <Div>

                    <Div $display='flex' $ai='center' $gap='1rem' $margin='0 auto' $fr='wrap'>

                            <Div $width='auto' $height='1rem' $display='flex' $ai='center' >
                                <Image $width='1rem' $heigth='1rem' $of='cover' $br='25px' src={profile_img} />
                            </Div>

                            <Div $display='flex' $gap='1rem' $ai='center'>
                                    <Text $fs='0.8rem'>@{fullname}</Text>
                                    <Text $fs='0.8rem'>{new Date(publishedAt).toString().slice(0,10)}</Text>
                            </Div>  
                    </Div>
                    <Div $display='flex' $jc='space-between' $fd='column' $margin='auto'>

                        <Div $height='100%' $display='flex' $fd='column'  $padding='1rem 0' $fr='wrap' >
                            <Title $fs='1rem' $tt='capitalize'>{title}</Title>
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