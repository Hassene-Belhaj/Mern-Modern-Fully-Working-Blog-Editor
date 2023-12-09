import React, { useRef } from 'react'
import { Button, Div, Form, Image, Input, Navlink, Section, Text } from '../Global/GlobalStyle'
import styled from 'styled-components'
import Blog_Editor_Nav from './Blog_Editor_Nav'
import { MdCloudUpload } from "react-icons/md";
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { useNavigate } from 'react-router';
import { useEditorContext } from '../Context/EditorContext';


const CloudUpload = styled(MdCloudUpload)`
`

const TextArea = styled.textarea`
width: 100%;
height: 100%;
/* outline: none;
border: none ; */
&::placeholder{
    font-size:1.5rem ;
}
`


const Blog_Editor = () => {
    const [image , setImage] = useState("")
    const [loading , setLoading] = useState(false)
    
    const {blog , blog :{title , banner , content, tags , desc}, setBlog , editorState , setEditorState} = useEditorContext()
    

    
    const navigate = useNavigate()


    const inputRef = useRef()
    
    const handleBannerUpload = () => {
        inputRef.current.click()
    }

    const handleImageUpload = (e) => {
        setTimeout(() => { 
        setImage(e.target.files[0]) 
        setLoading(false)
        }, 2000)
        setLoading(true)

    } 
    
    const handleTitleKeyDown =(e) => {
      if(e.key === "Enter"){
          navigate('/')
      }
    }



  return (
    <>
    <Blog_Editor_Nav />
  
        <Form $maxwidth='900px' $margin='5rem auto' >
           <Div $margin='4rem'  $display='flex' $jc='center'  $ai='center'   $border='4px dashed lightblue' onClick={handleBannerUpload} >
                <Input ref={inputRef} onChange={handleImageUpload} $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg' $z='1' hidden />
                {loading ? <LoadingSpinner/> :  <> 
                {image ? 
                <Image src={URL.createObjectURL(image)} $width="100%" $height='100%' /> 
                : 
                <CloudUpload  size={100} color='lightblue'/>
                 } 
                 </>}
           </Div>

          <Div $padding='2rem 0' $width='100%' $height='500px' >
                <TextArea onKeyDown={handleTitleKeyDown} placeholder='Blog Title' onChange={e=>setBlog({...blog , title : e.target.value})} >
                </TextArea> 
          </Div>

        </Form>
    </>
      
  )
}

export default Blog_Editor