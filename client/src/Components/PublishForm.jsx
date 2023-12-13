import React from 'react'
import { Container, Div, Form, Image, Input, Text, Title } from '../Global/GlobalStyle'
import LoadingSpinner from '../Utils/LoadingSpinner'
import { useRef } from 'react'
import { useEditorContext } from '../Context/EditorContext'
import { PUBLIC_IMAGES } from '../Utils/Url'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'



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
max
`

const PublishForm = () => {

  const {blog , blog :{title , banner , content, tags , desc}, setBlog , editorState , setEditorState} = useEditorContext()
  const [textLength , setTextLength] = useState(200)

const handleClose = () => {
  setEditorState('editor')
}

  return (
    <Container $padding='2rem' $position='relative' >


       <IconClose  onClick={handleClose} />

    <Form $maxwidth='900px' $margin='5rem auto' $position='relative' >

      <Div $margin='2rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='4px solid rgba(0,0,0,0.05)' >
            <Input  $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg'  hidden />
        
         
            {banner ? <Image src={PUBLIC_IMAGES+banner} $width="100%" $height='100%'/> : <Text>upload image</Text> }
            
      
       </Div>
         
         <Title $fs='1rem' $fw='500' >Blog Title</Title>

      <Div $margin='2rem auto' $width='100%' $height='3rem' $border='.5px solid rgba(0,0,0,0.2)' >
        <Input $width='100%' $height='100%' placeholder='Title' $padding='0 0 0 1rem' $outline='none' $border='none' $bg='#f3f4f6' value={title} onChange={e=>setBlog({title : e.target.value})} />
            {/* <hr style={{border:'solid .5px rgba(0,0,0,0.1)'}} /> */}
      </Div>
      <TextArea maxLength={textLength} >
      </TextArea>
      <Text>max length {textLength}</Text>
     

    </Form>
</Container>
  )
}

export default PublishForm