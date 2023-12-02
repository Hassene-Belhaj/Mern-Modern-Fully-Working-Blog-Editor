import React from 'react'
import { Button, Container, Div, Form, Image, Input, Navlink, Span, Text, Title } from '../Global/GlobalStyle'
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { GoKey } from "react-icons/go";
import {  AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { IconBase } from 'react-icons/lib';
import AnimationWrapper from '../Utils/AnimationWrapper';



const UserIcon = styled(AiOutlineUser)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left: 1rem;
`
const EmailIcon = styled(AiOutlineMail)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left: 1rem;
`
const PwdIcon = styled(GoKey)`
position: absolute;
top: 50%;
transform: translateY(-50%);
left: 1rem;
`
const Hr = styled.hr`
  width: 45%;
  height: 1px;
  border: .5px solid lightgrey;
`

const EyeInvisibleIcon = styled(AiFillEyeInvisible)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: 1rem;
cursor: pointer;
`
const EyeVisibleIcon = styled(AiFillEye)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: 1rem;
cursor: pointer;
`

const UserAuthForm = ({type}) => {
     const [EyeToggle , setEyeToggle] = useState(false)

  return (
    
    <Container $padding='7rem 0' $display='flex' $jc='center' $ai='center'>
      <AnimationWrapper initial={{opacity : 0.5 }} animate={{opacity : 1 , x: 0}} transition={{duration : 0.8}} exit={{opacity : 0}} key={type}>
        <Form $display='flex' $width='400px' $fd='column' $gap='2rem' $margin='auto'>
          <Title $ta='center' $fw='200'>{type === 'sign-up' ? 'Join Us Today' : 'Welcome Back'}</Title>

          {type === 'sign-up' ? 

           <>
             <Div $position='relative'>
                <Input $width='100%' $padding='0 0 0 3rem' $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Full Name'/>
                <UserIcon />
             </Div>
             <Div $position='relative'>
                 <Input $width='100%' $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none'  $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Email'/>
                <EmailIcon />
             </Div>
             <Div $position='relative'>
               <Input $width='100%'  $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type={EyeToggle ? 'text' : 'password'} placeholder='Password'/>
                <PwdIcon />
                {EyeToggle ? <EyeInvisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20} /> : <EyeVisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20}/>}
             </Div>
             <Button $width='100%' $margin='auto' $height='3rem' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9' > Sign Up</Button>
              <Div $width='100%' $display='flex' $jc='space-between' $ai='center'>
                <Hr />
                 <Text $color='lightgrey'>or</Text>
                <Hr />
              </Div>
              <Div>
              <Button $width='100%' $height='3rem' $display='flex' $jc='center' $ai='center' $margin='auto'  $br='25px' $bg='#000' $color='#fff' $border='none' $gap='1rem' $opacity='0.9' >
                    <Image $width='20px' $height='20px'  src='google.png' />
                    Continue With Google
                 </Button>
              </Div>
            <Div>
              <Text $ta='center'>
                  Already Member ?
                  <Navlink to='/signin' $padding='0 0 0 8px' $color='#000'>Sign In</Navlink> 
              </Text>
           </Div>
           </>
        
        
        : 

        <>

          <Div $position='relative'>
              <Input $width='100%' $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none'  $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Email'/>
             <EmailIcon />
          </Div>
          <Div $position='relative'>
               <Input $width='100%'  $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type={EyeToggle ? 'text' : 'password'} placeholder='Password'/>
                <PwdIcon />
                {EyeToggle ? <EyeInvisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20} /> : <EyeVisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20}/>}
             </Div>
          <Button $width='100%' $margin='auto' $height='3rem' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9' > Sign In</Button>
           <Div $width='100%' $display='flex' $jc='space-between' $ai='center'>
             <Hr />
              <Text $color='lightgrey'>or</Text>
             <Hr />
           </Div>
           <Div>
           <Button $width='100%' $height='3rem' $display='flex' $jc='center' $ai='center' $margin='auto'  $br='25px' $bg='#000' $color='#fff' $border='none' $gap='1rem' $opacity='0.9' >
                    <Image $width='20px' $height='20px'  src='google.png' />
                    Continue With Google
              </Button>
           </Div>
           <Div>
            <Text $ta='center' >
                Don't have an account ?
                <Navlink to='/signup' $td='underline' $padding='0 0 8px 8px' $color='#000'>Join Us Today </Navlink> 
            </Text>
           </Div>
        </>
        }
        </Form>
        </AnimationWrapper>
    </Container>
  )
}

export default UserAuthForm