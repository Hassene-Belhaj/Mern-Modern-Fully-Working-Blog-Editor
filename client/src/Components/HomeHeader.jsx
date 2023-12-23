import React from 'react'
import { Button, Div, Header } from '../Global/GlobalStyle'





const HomeHeader = ({toggle,setToggle,pageState}) => {
  return (
    <Header $display='flex' $gap='2rem' $jc='center' $MD_jc='start'  $ai='center' $width='90%'  $height='80px' $padding='2rem 2rem'   $borderB='solid 1px rgba(0,0,0,0.2)' $margin='auto'>  
        <Div onClick={()=>setToggle(true)}  $borderB={toggle ? 'solid 2px rgba(0,0,0,1)' : null} $height='80px'   $cursor='pointer' >
                <Button $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' $tt='capitalize' >{pageState ? pageState : 'Home'}</Button>
        </Div>

        <Div $MD_display='none' onClick={()=>setToggle(false)}  $borderB={toggle ? null : 'solid 2px rgba(0,0,0,1)'} $height='80px'   $cursor='pointer' >
                <Button $width='8rem' $margin='0 2rem' $fs='1rem' $fw='300' $padding='28px 0' $outline='none' $bg='transparent' $border='none' >Trending Blogs</Button>
        </Div>
   </Header>       
  )
}

export default HomeHeader