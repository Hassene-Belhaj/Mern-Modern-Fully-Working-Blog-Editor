import React from 'react'
import { Button, Div, Image, Navlink, Text } from '../Global/GlobalStyle'
import styled from 'styled-components'
import { useEditorContext } from '../Context/EditorContext'
import { useState } from 'react'


const Nav = styled.nav`
width: 100%;
height: 80px;
border-bottom: .5px solid rgba(0,0,0,0.1);
`



const Blog_Editor_Nav = ({handlePublishEvent,handleCreateBlogDraft}) => {

  return (
    <Nav>
    <Div $width='100%' $height='100%' $display='flex' $ai='center' $jc='space-between'  $padding='0 3rem' $bg='#fff' $gap='2rem'  >

            <Div $display='flex' $jc='center' $ai='center'>
                <Navlink to='/'>
                        <Image  $width='40px' $height='40px' src='/logo.png' />    
                </Navlink>

                    <Text $margin='0 0 0 2rem' style={{textTransform:'capitalize'}}>New Blog</Text>
            </Div>

            <Div $display='flex' $gap='2rem'>
                <Button $width='8rem' $height='40px' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.9' onClick={handlePublishEvent} > 
                    Publish
                </Button>

                <Button onClick={handleCreateBlogDraft} $width='8rem' $height='40px' $br='25px' $bg='#e5e7eb' $color='#000' $border='none' $opacity='0.9' >
                    Save Draft
                </Button>
            </Div>

    </Div>
    </Nav>
  )
}

export default Blog_Editor_Nav