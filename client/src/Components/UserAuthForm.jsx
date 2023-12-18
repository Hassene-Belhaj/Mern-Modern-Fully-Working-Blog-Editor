import React, { useRef } from 'react'
import { Button, Container, Div, Form, Image, Input, Navlink, Text, Title } from '../Global/GlobalStyle'
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { GoKey } from "react-icons/go";
import {  AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AnimationWrapper from '../Utils/AnimationWrapper';
import { useEffect } from 'react';
import axios from 'axios';
import { Url } from '../Utils/Url';
import { FirebaseAuth } from '../firebase/firebase';
import toast ,{ Toaster } from 'react-hot-toast'



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

     const authForm = useRef()
     
    const location =  useLocation()
    const navigate = useNavigate()
    
  



    const userAuthApiServer = async(serverRoute,formData) => {
      try {
          const resp = await axios.post(Url+serverRoute,formData,{withCredentials :true})
          console.log(resp);
        if(resp.status === 200 ) {
          toast.success('login successfully')
          setTimeout(() => { 
            navigate('/')
          }, 1000)

        } else if (resp.status === 200 || 201 ) {
          navigate('/signin')
        }
    
      } catch (error) {
       if(error?.response?.status.toString().startsWith(4)) {
         toast.error(error.response.data.msg)
        }
        
      }
    }


     // firebase
     const handleFireBaseSignIn = async (e) => {
       e.preventDefault()   

       try {
         const resp = await FirebaseAuth()

         let serverRoute = '/google-auth'
         
         let formData = {
            access_token : resp.accessToken
          }

        
          
          await userAuthApiServer(serverRoute ,formData)
        
      } catch (error) {
        toast.error('Trouble Login Through Google')     
      }
     }





    const handleSubmit =(e) => {
       e.preventDefault()
      
     // serverRoute to pass

    let serverRoute = type === 'sign-in' ? '/sign-in' : '/sign-up'
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


    let form = new FormData(authForm.current)
    let formData = {}
    for(let[key , value] of form.entries()){
      formData[key] = value ;
    }

    let {fullname , email , password} = formData

    if(fullname) {
      if(fullname.length < 3 ) return toast.error('Fullname must be at least 3 letters long')
    }
    if(!email.length ) return  toast.error('Enter email')
    if(!emailRegex.test(email)) return  toast.error('Invalid Email')
    if(!passwordRegex.test(password)) return toast.error('password shoud be 6 to 9 characters long with a numeric , 1 lowercase and 1 uppercase letters')

    userAuthApiServer(serverRoute,formData)
    
   }


  return (
    
    <Container $padding='8rem 0 0 0' $display='flex' $jc='center' $ai='center'>
      <AnimationWrapper initial={{opacity : 0.5 }} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={type}>

        <Form ref={authForm} onSubmit={handleSubmit}  $display='flex' $width='400px' $fd='column' $gap='2rem' $margin='auto'>
                 
                    <Toaster
                        toastOptions={{
                          success: {
                            duration : 1000 ,
                          },
                          error: {
                            duration : 1000 ,
                            // style: {
                            //   fontSize : '.8rem' , 
                            // },
                          },
                        }}
          />
          <Title $ta='center' $fw='200'>{type === 'sign-up' ? 'Join Us Today' : 'Welcome Back'}</Title>

        {type === 'sign-up' ? 

            <>
              <Div $position='relative'>
              <Input name='fullname' $width='100%' $padding='0 0 0 3rem' $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Full Name'/>
                <UserIcon />
              </Div>
              <Div $position='relative'>
                  <Input name='email' $width='100%' $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none'  $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Email'/>
                <EmailIcon />
              </Div>
              <Div $position='relative'>
                <Input  name='password' $width='100%'  $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type={EyeToggle ? 'text' : 'password'} placeholder='Password'/>
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
              <Button onClick={handleFireBaseSignIn}  $width='100%' $height='3rem' $display='flex' $jc='center' $ai='center' $margin='auto'  $br='25px' $bg='#000' $color='#fff' $border='none' $gap='1rem' $opacity='0.9' >
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
                  <Input name='email' $width='100%' $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none'  $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Email'/>
                <EmailIcon />
              </Div>

              <Div $position='relative'>
                  <Input name='password' $width='100%'  $padding='0 0 0 3rem'  $height='3rem' $br='5px'  $bg='#f3f4f6' $outline='none' $colorPH='#000' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type={EyeToggle ? 'text' : 'password'} placeholder='Password'/>
                    <PwdIcon />
                    {EyeToggle ? <EyeInvisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20} /> : <EyeVisibleIcon onClick={()=>setEyeToggle(!EyeToggle)} size={20}/>}
                </Div>

              <Button  $width='100%' $margin='auto' $height='3rem' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9' > Sign In</Button>
              <Div $width='100%' $display='flex' $jc='space-between' $ai='center'>
                <Hr />
                  <Text $color='lightgrey'>or</Text>
                <Hr />
              </Div>

              <Div>
                {/* firebase Auth */}
              <Button  onClick={handleFireBaseSignIn} $width='100%' $height='3rem' $display='flex' $jc='center' $ai='center' $margin='auto'  $br='25px' $bg='#000' $color='#fff' $border='none' $gap='1rem' $opacity='0.9' >
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


