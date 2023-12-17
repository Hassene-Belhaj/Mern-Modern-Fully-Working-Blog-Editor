import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Container, Div, Image, Input, Navlink, Span, Text} from '../Global/GlobalStyle'
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit , FaRegBell } from "react-icons/fa";
import styled from 'styled-components';
import { useAuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { Url } from '../Utils/Url';
import DropDownPanel from './DropDownPanel';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

const Nav = styled.nav`
width: 100%;
height: 80px;
border-bottom: .5px solid rgba(0,0,0,0.1);
position: relative;
`

const SearchIcon = styled(AiOutlineSearch)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: ${({$right})=>$right};
right: ${({$left})=>$left};
cursor: pointer;
`

const WriteIcon = styled(FaRegEdit)`
cursor: pointer;
`  

const BellIcon = styled(FaRegBell)`

`


const Navbar = () => {
   const {isLoggedIn , CheckUserApi} = useAuthContext()

     const [show , setShow] = useState(false)
     const [showPannel , setShowPannel] = useState(false)

     const [userInfo , setUserInfo] = useState(null)

      // console.log(isLoggedIn?.data?.user.id);

    const handleBlur = () => {
      setTimeout(() => { setShowPannel(false) }, 300)
    }


     const handleLogoutApi = async(e) => {
       e.preventDefault()
        try {
           const resp = await axios.post(Url+'/logout' ,{
           },{withCredentials : true})
           CheckUserApi()
           toast.success('log out successfully')
           setTimeout(() => { 
             window.location.reload()
            }, 1200)
         } catch (error) {
            console.log(error);
         }
      }
     
     const UserInfoApi = async() => {
      try {
         const resp = await axios.get(Url+'/user/'+isLoggedIn?.data?.user.id,{withCredentials : true})
         // console.log(resp.data.data);
         setUserInfo(resp?.data?.data);
      } catch (error) {
         console.log(error);
      }
     } 
   
    useEffect(()=>{
      UserInfoApi()
    },[isLoggedIn])



  return (
    <Nav>
       <Toaster />
      <DropDownPanel showPannel={showPannel} userInfo={userInfo} handleLogoutApi={handleLogoutApi} />
      
      <Div $width='100%' $height='100%'  $display='flex' $ai='center' $jc='space-between' $padding='0 3rem' $bg='#fff'  $position='absolute' $z='4'>

            <Div $display='flex'  $ai='center'>

                 <Navlink to='/'>
                         <Image  $width='40px' $height='40px' src='logo.png' />    
                 </Navlink>

                 <Div $Md='none' $width='250px'$height='40px' $position='relative' $margin='0 0 0 2rem'> 
                       <Input $width='100%' $height='100%' $br='25px'  $bg='#f3f4f6' $outline='none' $padding='0 0 0 16px' $colorPH='#000' placeholder='Search' 
                        $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'/>
                       <SearchIcon $right='1rem' size={20}  />  
                </Div>
          
         </Div>

            <Div $display='flex' $jc='center' $ai='center' $gap='1rem' >
                
                 <Div $Lg='none' $width='auto' $position='relative'>
                    <Button $padding='6px' $br='25px' $display='flex' $jc='center' $bg='#e5e7eb' $border='none' $opacity='0.9'>
                       <AiOutlineSearch onClick={()=>setShow(!show)} size={20} />
                    </Button>
                     </Div>
                       <Navlink $color='#000' $td='none'  to={isLoggedIn !== undefined ? '/editor' : '/signin'} >
                         <Div  $display='flex' $jc='center' $ai='center'  $width='100%' $height='3rem' $gap='.5rem' $cursor='pointer' $bgh='#f3f5f9' $transition='all ease-in-out 0.3s'> 
                           <WriteIcon />
                           <Text>Write</Text>
                         </Div>
                       </Navlink>
                      {isLoggedIn !== undefined ?
                      <>
                        <Button  $padding='6px' $br='25px' $display='flex' $jc='center' $bg='#e5e7eb' $border='none' $opacity='0.9'> 
                        <BellIcon size={20} />
                        </Button> 
                        <Button onClick={()=>setShowPannel(!showPannel)} onBlur={handleBlur}  $br='25px' $display='flex' $jc='center' $bg='#e5e7eb' $border='none' $opacity='0.9'> 
                        <Image  $width='2rem' $br='25px' src={userInfo?.profile_img} referrerPolicy='no-referrer' alt='image profile'/>
                        </Button> 
                      </>
                      :  
                       <>
                     <Navlink to='/signin'>
                        <Button $width='8rem' $height='40px' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9'>Sign In</Button>
                     </Navlink> 
                     <Navlink to='/signup'>
                        <Button $Md='none' $width='8rem' $height='40px' $br='25px' $bg='#e5e7eb' $color='#000' $border='none' $opacity='0.9' >Sign UP</Button>
                     </Navlink>
                     </>
                     }

                  </Div>
     </Div>

            <Div $Lg='none'  $width='90%' $hight='auto' $display={show ? 'flex' : 'none'} $jc='center' $margin='auto' $padding='7rem 0' $position='relative' > 
               <Input  $width='100%' $height='3rem' $br='25px' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'$bg='#f3f4f6' $outline='none' $padding='0 0 0 25px' $colorPH='#000' placeholder='Search' />
               <SearchIcon $right='1rem' size={30}  />  
            </Div> 
    </Nav>
  )
}

export default Navbar