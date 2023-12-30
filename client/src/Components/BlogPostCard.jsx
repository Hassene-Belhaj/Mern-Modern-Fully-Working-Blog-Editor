import React from 'react'
import { Button, Container, Div, Image, Text, Title } from '../Global/GlobalStyle'
import { CiHeart } from "react-icons/ci";
import styled from 'styled-components';
import LoadingSpinner from '../Utils/LoadingSpinner';



const LikeIcon = styled(CiHeart)`
cursor: pointer;
`

const BlogPostCard = ({data , author}) => {

    const {publishedAt, title , banner , desc, tags , activity } = data
    const {fullname,email,username,profile_img} = author



    return (
        
        <Container  $padding='1rem' $display='flex'  $jc='space-between'  $width='90%' $margin='auto' $borderB='.5px solid rgba(0,0,0,0.2)'>

            <Div  >
                    <Div $display='flex' $ai='center'  $gap='1rem' $margin='auto'>
                            <Div $width='1rem' $height='1rem' $display='flex' $ai='center' >
                                <Image $width='1rem' $heigth='1rem' $of='cover' $br='25px' src={profile_img} />
                            </Div>
                                    {/* <Text $fs='0.7rem'>{email}</Text> */}
                            <Div $display='flex' $gap='1rem' $ai='center'>
                                    <Text $fs='0.8rem'>@{fullname}</Text>
                                    <Text $fs='0.8rem'>{new Date(publishedAt).toString().slice(0,10)}</Text>
                            </Div>  
                    </Div>


                <Div $display='flex' $jc='space-between' $fd='column' $margin='auto'>

                    <Div   $height='100%' $display='flex' $fd='column'  $padding='1rem 0' >
                        <Title $fs='1rem' $tt='capitalize' >{title}</Title>
                        <Div $display='none' $MD_display='flex  '>
                        <Text $width='80%' $margin='.5rem 0' $padding='.2rem 0' $fs='0.8rem' $display='none' $XL_display='flex'>{desc}</Text>
                        </Div>
                    </Div>


           <Div   $display='flex'  $gap='1rem' >
             
                <Div  $width='auto' $display='flex' $jc='start' $ai='center'  $fw='wrap'  $gap='10px'>

                {tags?.map((tag,i)=>{
                    return (
                        <Button key={i}  $width='auto' $padding='10px' $br='25px' $display='flex' $jc='center' $ai='center' $bg='#f3f5f9' $border='none' $opacity='0.9'>
                            <Text $tt='capitalize' $outline='none' $fw='400'>{tag}</Text>
                        </Button>      
                        )
                    })}

                </Div>

                <Div $height='2.5rem' $gap='1rem'  $display='flex' $jc='center' $ai='center'  $margin='0 1rem 0 0 '>
                    <Button $outline='none' $border='none' $bg='transparent' $display='flex' $jc='center' $ai='center' $gap='.5rem'>
                    <LikeIcon size={20}  />
                    <Text>{activity.total_likes}</Text> 
                    </Button>   
                </Div>

             </Div>

            </Div>     
        </Div>  
            
            <Div $flex='1/2' $display='none' $SM_display='flex'  $jc='center' $ai='center' >
                    <Div  $width='8rem' $height='8rem' $display='flex' $padding='0 0 0 1rem'>
                       <Image $width='100%' $height='100%' $of='cover' $br='5px' src={banner} /> 
                    </Div>
            </Div> 
                
      

   </Container> 
    )
}

export default BlogPostCard