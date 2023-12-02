import React, { useState } from 'react'
import { Button, Container, Div, Image, Input, Navlink, Span, Text} from '../Global/GlobalStyle'
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import styled from 'styled-components';

const Nav = styled.nav`
width: 100%;
height: 80px;
padding-top:4px ;
`

const SearchIcon = styled(AiOutlineSearch)`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: ${({$right})=>$right};
right: ${({$left})=>$left};
`
const SearchIcon2 = styled(AiOutlineSearch)`
`

const WriteIcon = styled(FaRegEdit)`
`

const Navbar = () => {
     const [show , setShow] = useState(false)
     
  return (
    <Nav>
      <Div $width='90%' $height='80px' $display='flex' $jc='space-between' $ai='center' $margin='auto'>

            <Div $display='flex' $ai='center'>

                 <Navlink>
                         <Image  $width='40px' $height='40px' src='/public/logo.png' />    
                 </Navlink>

                 <Div $Md='none' $width='250px'$height='40px' $position='relative' $margin='0 0 0 2rem'> 
                       <Input $width='100%' $height='100%' $br='25px'  $bg='#f3f4f6' $outline='none' $padding='0 0 0 16px' $colorPH='#000' placeholder='Search' 
                        $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'/>
                       <SearchIcon $right='1rem' size={20}  />  
                </Div>
          
         </Div>

            <Div $display='flex' $jc='center' $ai='center' $gap='1rem' >
                 <Div $Md='none' $display='flex' $jc='center' $ai='center' $gap='10px'  $width='5rem'> 
                    <WriteIcon />
                    <Text>Write</Text>
                 </Div>
                 <Div $Lg='none' $width='auto%' $position='relative'>
                    <Button $padding='6px' $br='25px' $display='flex' $jc='center' $bg='#e5e7eb' $border='none'>
                       <AiOutlineSearch onClick={()=>setShow(!show)} size={20} />
                    </Button>
                 </Div>
                <Button $width='8rem' $height='40px' $br='25px' $bg='#000' $color='#fff' $border='none' >Sign In</Button>
                <Button $Md='none' $width='8rem' $height='40px' $br='25px' $bg='#e5e7eb' $color='#000' $border='none' >Sign UP</Button>
            </Div>
     </Div>

            <Div $Lg='none' $width='90%' $display={show ? 'flex' : 'none'} $jc='center' $margin='auto' $padding='2rem 0' $position='relative'> 
               <Input  $width='100%' $height='3rem' $br='25px' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'$bg='#f3f4f6' $outline='none' $padding='0 0 0 25px' $colorPH='#000' placeholder='Search' />
               <SearchIcon $right='1rem' size={30}  />  
            </Div> 
    </Nav>
  )
}

export default Navbar