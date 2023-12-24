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
import { PUBLIC_IMAGES, UploadImageUrl, Url, UrlBlog } from '../Utils/Url';
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
  
  const {isLoggedIn , CheckUserApi} = useAuthContext()

  
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
      
       

    
    const inputRef = useRef()
    
    const navigate = useNavigate()

    // hidden input & event click
    const handleBannerUpload = (e) => {
       if(banner) {
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
    if (!e.target.files[0].name.includes( 'jpg' || 'png' || 'jpeg')) {
       toast.dismiss(ToasterId)
       toast.error('please upload a valid file format you can upload jpg , jpeg or png')
       return ;
    }
    try {
    const resp = await axios.post(UploadImageUrl+'/upload_image',Data,{withCredentials:true})
        console.log(resp?.data?.data.url);
        setBanner(resp?.data?.data.url)
    } catch (error) {
    toast.error(error)
    console.log(error);
    }
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


  // draft

  const handleCreateBlogDraft = async (e) => {

    e.preventDefault()
    
    if(!title.length) return toast.error('you must provide a Title to saving this Post')
    
   const Data = {
    title , banner , desc , tags , content ,  author : isLoggedIn?.data?.user.id, draft : true ,
   }
  
   const ToastLoading = toast.loading('Loading')
  try {
    const resp = await axios.post(UrlBlog+'/create_blog' , Data , {withCredentials : true} )
    console.log(resp);
    if(resp.status === 200) {
      setTimeout(() => { 
        navigate('/') 
        setTitle('')
        setBanner('')
        setEditorState('editor') 
      }, 1000)
    }

  } catch (error) {
    console.log(error);
    toast.error(error)
  }
  toast.dismiss(ToastLoading)
  toast.success('Saved')
  }



  
  return (
    <>
    <Blog_Editor_Nav  handlePublishEvent={handlePublishEvent}  handleCreateBlogDraft={handleCreateBlogDraft}/>
    <Container $padding='2rem' >
        <Form $maxwidth='900px' $margin='2rem auto' $position='relative'  >
              <Toaster />
           {banner? 
           <Div $position='absolute' $top='1rem' $right='1rem'>
             <CloseIcon onClick={handleClickDeleteImage} color='#f3f5f9' size={20}/> 
            </Div> 
            : null}

          <Div $margin='1rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'    onClick={handleBannerUpload} $border='.5px solid rgba(0,0,0,0.1)' >
                <Input ref={inputRef}  onChange={UploadImageApi} $width='100%' $outline='none' type="file" name='file' accept='.png , .jpg , .jpeg'  hidden />
            
              
                {banner ? 
                <Image src={banner} $width="100%" $height='100%' $of='cover'/> 
                : 
                <>
                 <Div $display='flex' $jc='center' $ai='center' $gap='1rem' > 
                  <CloudUpload size={70} color='#818cf8' />
                  <Text $color='#818cf8'>upload banner</Text>
                 </Div>
                </>
                // <Image src='blog_banner.png'  $width="100%" $height='100%' $of='center'/> 
                } 

           </Div>

             
           <Div $margin='2rem 0 0 0' $width='100%' height='auto'  $border='none' $fs='3rem' $display='flex' $jc='center' $ai='center' >
              <TextArea  $width='100%' $height='100%'  $fs='1.2rem'  $tt='capitalize' $resize="none" $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' $padding='1rem' $br='7px'  placeholder='Blog Title'  name='title' $outline='none'  value={title} onChange={handleTitleChange} ></TextArea>
          </Div> 
           

          <hr style={{margin:'0 0 .5rem 0', border:'.5px solid rgba(0,0,0,0.05)'}} />

          <Div $display='flex' $jc='end'>
             <Text $fs='0.9rem' $color={textLength - title?.length >= 0 ? '#000' : 'red'} > {textLength - title?.length || 0 } characters left </Text>
           </Div>
           
        
            
           <Div $margin='3rem 0'>
             <ReactQuill theme='snow' placeholder='Compose an epic' modules={modules}  value={content} onChange={setContent} />
          </Div> 
                 
                    
        </Form>
    </Container>
    </>
  )
}

export default Blog_Editor


