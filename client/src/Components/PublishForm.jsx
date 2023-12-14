import React from 'react'
import { Container, Div, Form, Image, Input, Text, Title } from '../Global/GlobalStyle'
import LoadingSpinner from '../Utils/LoadingSpinner'
import { useEditorContext } from '../Context/EditorContext'
import { PUBLIC_IMAGES } from '../Utils/Url'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'
import { useState } from 'react'



const IconClose = styled(AiOutlineClose)`
position: absolute;
top: 3rem;
right: 3rem;
`
const TextArea = styled.textarea`
width: 100%;
height: 10rem;
resize: none;
border: .5px solid rgba(0,0,0,0.2 );
outline: none;
background-color: #f3f4f6;
`

const PublishForm = () => {

  const {blog , blog :{title , banner , content, tags , desc}, setBlog , editorState , setEditorState} = useEditorContext()

  let textLength = 200


const handleClose = () => {
  setEditorState('editor')
}

  return (
    <Container $padding='2rem' $position='relative' >


       <IconClose  onClick={handleClose} />

    <Form $maxwidth='900px' $margin='5rem auto' $position='relative' >

      <Div $margin='2rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='4px solid rgba(0,0,0,0.05)' >
            <Input  $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg'  hidden />
        
         
            {banner?.url ? <Image src={banner?.url} $width="100%" $height='100%'/> : <Text>upload image</Text> }
            
      
       </Div>
         
         <Title $fs='1rem' $fw='500' >Blog Title</Title>

      <Div $margin='1rem 0 0 0' $width='100%' $height='3rem' $border='.5px solid rgba(0,0,0,0.2)' >
        <Input $width='100%' $height='100%' placeholder='Title' $padding='0 0 0 1rem' $outline='none' $border='none' $bg='#f3f4f6' />  
      </Div>


        <Title $margin='1rem 0' $fs='1rem' $fw='500' >Short Description About Your Blog</Title>
      <Div >
        <TextArea  value={desc || ''} textLength={textLength} onChange={e=>setBlog({desc : e.target.value})} > </TextArea>
      </Div> 

      <Div $display='flex' $jc='end'>
         <Text $fs='0.8rem' > {textLength - desc?.length } characters left </Text>
      </Div>
     

    </Form>
</Container>
  )
}

export default PublishForm