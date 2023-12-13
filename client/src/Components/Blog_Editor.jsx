import React, { useEffect, useRef } from 'react'
import { Button, Container, Div, Form, Image, Input, Navlink, Section, Text } from '../Global/GlobalStyle'
import styled from 'styled-components'
import Blog_Editor_Nav from './Blog_Editor_Nav'
import { MdCloudUpload } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import { useLocation, useNavigate } from 'react-router';
import { useEditorContext } from '../Context/EditorContext';
import axios from 'axios';
import { PUBLIC_IMAGES, UploadImageUrl } from '../Utils/Url';
import { useAuthContext } from '../Context/AuthContext';
// import EditorJs from '@editorjs/editorjs'
// import { Tools } from './EditorJS_Tools';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import AnimationWrapper from '../Utils/AnimationWrapper';



const CloudUpload = styled(MdCloudUpload)`
`

const TextArea = styled.textarea`
width: 100%;
height: auto;
outline: none;
border: none ;
font-size:2.2rem ;
text-transform: capitalize;
resize : none ;
&::placeholder{
  color: rgba(0,0,0,0.2);
}
`
const CloseIcon = styled(AiOutlineClose)`
cursor: pointer;
`



const Blog_Editor = () => {
 
// useEffect(()=>{
//  let editor = new EditorJs({
//    holder : "editorjs" ,
//    data : "" ,
//    tools : Tools ,
//    placeholder : "add text",
//  })
// },[])

    const {blog , blog :{title , banner , content, tags , desc}, setBlog , editorState , setEditorState} = useEditorContext()

    const {isLoggedIn , CheckUserApi} = useAuthContext()


    const [loading , setLoading] = useState(false)

    const [error , setError] = useState({banner : '' , title :'' , content :''})

    const [value , setValue] = useState({
      title : '' ,
      desc : '' ,
    })

    
    console.log(editorState);  
    
    const inputRef = useRef()
    

    // hidden input & event click
    const handleBannerUpload = (e) => {
       if(banner) {
        e.preventDefault()
       } else {
         inputRef.current.click()
       }
    }

  
    // const handleTitleKeyDown =(e) => {
    //   if(e.keyCode === 13){
    //     e.preventDefault()
    //   }
    // }

    const handlePublishEvent = () => {
      // if(!banner) {
      //   return setError({banner : 'upload banner to publish the post'})
      // }
      // if(title.length) {
      //   return setError({title : 'write a title to publish it'})
      // }
      setEditorState('publish') 
      console.log(editorState);
    }


    const UploadImageApi = async(e) => {

      const Data = new FormData()
      Data.append('image' , e.target.files[0])
      try {
        const resp = await axios.post(UploadImageUrl+'/upload_image', Data,{withCredentials:true})
        setTimeout(() => {
          setLoading(false)
      }, 2000)
      setBlog({banner : resp?.data?.image.filename})
    } catch (error) {
      console.log(error);
    }
    setLoading(true)
    }

   const handleClickDeleteImage = async () => {
     try {
       const resp = await axios.post(UploadImageUrl+'/delete_image',{image : banner},{withCredentials:true})
       setBlog({banner : ''})
     } catch (error) {
      console.log(error);
     }
  }
  
  return (
    <>
    <Blog_Editor_Nav  handlePublishEvent={handlePublishEvent}/>
    <Container $padding='2rem' >
        <Form $maxwidth='900px' $margin='5rem auto' $position='relative'  >

           {banner ? 
           <Div $position='absolute' $top='1rem' $right='2rem'>
             <CloseIcon onClick={handleClickDeleteImage} color='#000' size={20}/> 
            </Div> 
            : null}

          <Div $margin='2rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='4px solid rgba(0,0,0,0.05)' onClick={handleBannerUpload} >
                <Input ref={inputRef} onChange={UploadImageApi} $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg'  hidden />
            
                {loading ? <LoadingSpinner type={true}/> 
                :  
                <> 

                {banner ? 
                <Image src={PUBLIC_IMAGES+banner} $width="100%" $height='100%'/> 
                : 
                <Text>upload image</Text> 
                } 
                </>}
           </Div>
              {error.title ?  <Text>{error?.title}</Text> : null}
             
          <Div $margin='2rem auto' $width='100%' $height='3rem' $border='.5px solid rgba(0,0,0,0.2)' >
                <Input $width='100%' $height='100%' placeholder='Title' $padding='0 0 0 1rem' $outline='none' $border='none' $bg='#f3f4f6' value={title} onChange={e=>setBlog({title : e.target.value})} />
          </Div>

           
          <ReactQuill value={value} onChange={(newValue)=>setValue(newValue)}  />

        </Form>
    </Container>
    </>
  )
}

export default Blog_Editor