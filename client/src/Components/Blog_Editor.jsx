import React from 'react'
import { Button, Div, Input, Navlink } from '../Global/GlobalStyle'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaRegBell, FaRegEdit } from 'react-icons/fa'



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

const Blog_Editor = () => {
  return (
    <Nav>

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
              
              
                   <Navlink to='/signin'>
                      <Button $width='8rem' $height='40px' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9'>Sign In</Button>
                   </Navlink> 
                   <Navlink to='/signup'>
                      <Button $Md='none' $width='8rem' $height='40px' $br='25px' $bg='#e5e7eb' $color='#000' $border='none' $opacity='0.9' >Sign UP</Button>
                   </Navlink>
                

                </Div>
   </Div>

          <Div $Lg='none'  $width='90%' $hight='auto' $jc='center' $margin='auto' $padding='7rem 0' $position='relative' > 
             <Input  $width='100%' $height='3rem' $br='25px' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'$bg='#f3f4f6' $outline='none' $padding='0 0 0 25px' $colorPH='#000' placeholder='Search' />
             <SearchIcon $right='1rem' size={30}  />  
          </Div> 
  </Nav>
  )
}

export default Blog_Editor