import React from 'react'
import { Button, Container, Div, Image, Text, Title } from '../Global/GlobalStyle'
import { CiHeart } from "react-icons/ci";
import styled from 'styled-components';



const LikeIcon = styled(CiHeart)`
cursor: pointer;
`

const BlogPostCard = ({data , author}) => {

    const {publishedAt, title , banner , desc, tags , activity } = data
    const {fullname,email,username,profile_img} = author
  return (
 
   <Container $padding='2rem 0' $width='90%' $display='flex' $margin='auto' $borderB='.5px solid rgba(0,0,0,0.2)'>

            <Div $flex='1' >

               <Div $display='flex'  $gap='1rem' $margin='0 auto'>
                    <Div $width='2rem' $height='2rem' $display='flex' $ai='center' >
                        <Image $width='2rem' $heigth='2rem' $of='cover' $br='25px' src={profile_img} />
                    </Div>
                            {/* <Text $fs='0.7rem'>{email}</Text> */}
                    <Div $display='flex' $gap='1rem' $ai='center'>
                            <Text $fs='0.9rem'>@{fullname}</Text>
                            <Text $fs='0.9rem'>{new Date(publishedAt).toString().slice(0,10)}</Text>
                    </Div>  
               </Div>


            <Div $width='100%'  $display='flex' $jc='space-between' $fd='column' $margin='auto'>

                <Div $height='100%' $display='flex' $fd='column'  $padding='1rem 0' >
                    <Title $fs='1.3rem'>{title}</Title>
                    <Div $Md='none'>
                      <Text $padding='.5rem 0' $fs='.9rem'>{desc}</Text>
                    </Div>
                </Div>


           <Div   $display='flex'  $gap='1rem' >
             
                <Div  $width='auto' $display='flex' $jc='start' $ai='center'  $fw='wrap'  $gap='10px'>

                {tags?.map((tag,i)=>{
                    return (
                        <Button key={i} $fw='700' $width='auto' $padding='10px' $br='25px' $display='flex' $jc='center' $ai='center' $bg='#f3f5f9' $border='none' $opacity='0.9'>
                            <Text $tt='capitalize' $outline='none'>{tag}</Text>
                        </Button>      
                        )
                    })}

                </Div>
            <Div $height='2.5rem' $gap='1rem'  $display='flex' $jc='center' $ai='center' >
                <Button $outline='none' $border='none' $bg='transparent' $display='flex' $jc='center' $ai='center' $gap='.5rem'>
                <LikeIcon size={20}  />
                <Text>{activity.total_likes}</Text> 
                </Button>
            </Div>
             </Div>



         

            </Div>   

                </Div>  
                

            
            <Div $flex='1' $display='flex' $jc='end' $ai='center' >
                    <Image $width='15rem' $heigth='15rem' $of='cover' $br='5px' src={banner} />
            </Div> 
   </Container> 
    )
}

export default BlogPostCard