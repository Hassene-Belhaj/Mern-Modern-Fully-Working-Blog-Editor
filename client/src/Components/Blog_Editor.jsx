import React, { useEffect, useRef } from 'react'
import {Button, Container, Div, Form, Image, Input, Text, TextArea } from '../Global/GlobalStyle'
import styled from 'styled-components'
import Blog_Editor_Nav from './Blog_Editor_Nav'
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { useLocation, useNavigate, useParams } from 'react-router';
import { blogStructure, useEditorContext } from '../Context/EditorContext';
import axios from 'axios';
import { PUBLIC_IMAGES, UploadImageUrl, Url, UrlBlog } from '../Utils/Url';
import { useAuthContext } from '../Context/AuthContext';
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import AnimationWrapper from '../Utils/AnimationWrapper';
import { formats, modules } from '../Utils/React_quill_module';

const CloudUpload = styled(MdCloudUpload)`
`

const CloseIcon = styled(AiOutlineClose)`
cursor: pointer;
`

const Blog_Editor = () => {


  
  const {isLoggedIn , CheckUserApi} = useAuthContext()

  const {editorState , setEditorState,  blog , blog : { title , desc , banner , content , tags , author} , setBlog , error , setError} = useEditorContext()

  const [quill , setQuill] = useState('')




const {blog_id} = useParams()

useEffect(()=>{
setBlog({...blog , content : quill})  
},[quill])

useEffect(()=>{
  if(blog_id) {
    setQuill(content[0])
  }
},[blog_id])


// edit blog && edit
  useEffect(()=>{
  if(blog_id === undefined || null ){
    return (
      setBlog(blogStructure)
    )
  }
  },[blog_id])


  let textLength = 150
 

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
      setBlog({...blog , title : e.target.value})
    }

    const handlePublishEvent = () => {
      setEditorState('publish') 
    }


  //image
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
    const resp = await axios.post(UploadImageUrl+'/upload_image', Data ,{withCredentials:true})
        console.log(resp?.data?.data.url);
        setBlog({...blog , banner : resp?.data?.data.url})
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
       setBlog({...blog , banner : ''})
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
                } 
           </Div>

           <Div $margin='2rem 0 0 0' $width='100%' height='auto'  $border='none' $fs='3rem' $display='flex' $jc='center' $ai='center' >
              <TextArea  $width='100%' $height='100%'  $fs='1.2rem'  $tt='capitalize' $resize="none" $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' $transition='all ease-in-out 0.5s' $padding='1rem' $br='7px'  placeholder='Blog Title'  name='title' $outline='none'  value={title} onChange={handleTitleChange} ></TextArea>
          </Div> 
           

          <hr style={{margin:'0 0 .5rem 0', border:'.5px solid rgba(0,0,0,0.05)'}} />

            <Div $display='flex' $jc='end'>
              {title?.length ===  undefined | 0 ? <Text $fs='0.9rem'>150 characters</Text> :  <Text $fs='0.9rem' $color={textLength - title?.length >= 0 ? '#000' : 'red'} > {textLength - title?.length || 0} characters left </Text>  }
              
           </Div>
          
           

           <Div id='textEditor' $margin='3rem 0'>
              <ReactQuill theme='snow' placeholder='Compose an epic' modules={modules} value={quill} onChange={setQuill}  />
          </Div> 
                    
        </Form>
    </Container>
   </>
 
  )
}

export default Blog_Editor


