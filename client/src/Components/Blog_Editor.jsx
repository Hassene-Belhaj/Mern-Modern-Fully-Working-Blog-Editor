import React, { useEffect, useRef } from 'react'
import {Button, Container, Div, Form, Image, Input, Text, TextArea } from '../Global/GlobalStyle'
import styled from 'styled-components'
import Blog_Editor_Nav from './Blog_Editor_Nav'
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { useLocation, useNavigate } from 'react-router';
import { useEditorContext } from '../Context/EditorContext';
import axios from 'axios';
import { PUBLIC_IMAGES, UploadImageUrl, Url } from '../Utils/Url';
import { useAuthContext } from '../Context/AuthContext';
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import AnimationWrapper from '../Utils/AnimationWrapper';



const CloudUpload = styled(MdCloudUpload)`
`

const CloseIcon = styled(AiOutlineClose)`
cursor: pointer;
`

const Blog_Editor = () => {
 

    const {editorState , setEditorState , title , setTitle ,banner , setBanner ,content ,
      setContent , desc , setDesc , tags , setTags , author , setAuthor} = useEditorContext()

    let textLength = 150
    

    let  toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],            // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],                  // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],         // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],             // outdent/indent
      [{ 'direction': 'rtl' }],                            // text direction
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],             // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']                                    // remove formatting button
    ];

    const modules= {
      toolbar : toolbarOptions
    }
      
    

    const [loading , setLoading] = useState(false)
    const [image , setImage] = useState('')
    const [value, setValue] = useState('');
     
    const [error , setError] = useState({banner : '' , title :'' , content : '' , tags : ''})

    
    const inputRef = useRef()
    
    

    // hidden input & event click
    const handleBannerUpload = (e) => {
       if(banner?.url) {
        e.preventDefault()
       } else {
         inputRef.current.click()
       }
    }


    const handleTitleChange = (e) => {
      e.preventDefault()
      setTitle(e.target.value)
    }

    const handlePublishEvent = () => {
      setEditorState('publish') 
    }


    const UploadImageApi = async(e) => {
    const ToasterId = toast.loading('Loading')  
    const Data = new FormData()
    Data.append('image' , e.target.files[0])
    try {
    const resp = await axios.post(UploadImageUrl+'/upload_image',Data,{withCredentials:true})
        console.log(resp?.data?.data.url);
        setBanner(resp?.data?.data.url)
    } catch (error) {
    console.log(error);
    }
    setLoading(false)
    toast.dismiss(ToasterId)
    toast.success('image uploaded successfully')
    }


   const handleClickDeleteImage = async () => {
     try {
       const resp = await axios.post(UploadImageUrl+'/delete_image',{image: banner.public_id },{ withCredentials:true })
       console.log(banner.public_id);
       console.log(resp);
       setBanner('')
     } catch (error) {
      console.log(error);
     }
  }

  
  return (
    <>
    <Blog_Editor_Nav  handlePublishEvent={handlePublishEvent}/>
    <Container $padding='2rem' >
        <Form $maxwidth='900px' $margin='2rem auto' $position='relative'  >
              <Toaster />
           {banner?.url ? 
           <Div $position='absolute' $top='1rem' $right='1rem'>
             <CloseIcon onClick={handleClickDeleteImage} color='#f3f5f9' size={20}/> 
            </Div> 
            : null}

          <Div $margin='1rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='2px solid rgba(0,0,0,0.05)' onClick={handleBannerUpload} >
                <Input ref={inputRef}  onChange={UploadImageApi} $width='100%' $outline='none' type="file" name='file' accept='.png , .jpg , .jpeg'  hidden />
            
              
                {banner ? 
                <Image src={banner} $width="100%" $height='100%'/> 
                : 
                <CloudUpload size={70} color='#818cf8' />
                } 

           </Div>

            <Div>
               <Text $ta='center' $fs='0.8rem' $color='red' >{error?.banner}</Text>

            </Div>

             
           <Div $margin='2rem 0 0 0' $width='100%' height='auto'  $border='none' $fs='3rem' $display='flex' $jc='center' $ai='center' >
              <TextArea  $width='100%' $height='100%'  $fs='1.2rem'  $tt='capitalize' $resize="none" $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' $padding='1rem' $br='7px'  placeholder='Blog Title'  name='title' $outline='none'  value={title} onChange={handleTitleChange} ></TextArea>
          </Div> 
           

          <hr style={{margin:'0 0 .5rem 0', border:'.5px solid rgba(0,0,0,0.05)'}} />

          <Div $display='flex' $jc='end'>
             <Text $fs='0.8rem' $color={textLength - title?.length >= 0 ? '#000' : 'red'} > {textLength - title?.length || 0 } characters left </Text>
           </Div>
           
        
            
           <Div $margin='3rem 0'>
             <ReactQuill theme='snow' placeholder='Compose an epic' modules={modules}  value={value} onChange={setValue} />
          </Div> 
                 
        

            <Button $width='100%' $height='40px' $br='7px' $bg='#000' $color='#fff' $border='none' $opacity='0.8'>Post</Button>
            
        </Form>
    </Container>
    </>
  )
}

export default Blog_Editor