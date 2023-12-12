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


    const {isLoggedIn , CheckUserApi} = useAuthContext()
    const [image , setImage] = useState(null)
    const [loading , setLoading] = useState(false)
    const [value , setValue] = useState({
      title : '' ,
      desc : '' ,

    })
     console.log(value); 

    const {blog , blog :{title , banner , content, tags , desc}, setBlog , editorState , setEditorState} = useEditorContext()
    

    const navigate = useNavigate()
    const location = useLocation()
    
    const notify = () => toast.error('uloading')

    //  console.log(image);

    const inputRef = useRef()
    
    // hidden input & event click
    const handleBannerUpload = (e) => {
       if(image) {
        e.preventDefault()
       } else {
         inputRef.current.click()
       }
    }

  
    const handleTitleKeyDown =(e) => {
      if(e.keyCode === 13){
        e.preventDefault()
      }
    }

    const UploadImageApi = async(e) => {

      const Data = new FormData()
      Data.append('image' , e.target.files[0])

      try {
        const resp = await axios.post(UploadImageUrl+'/upload_image', Data,{withCredentials:true})
        setTimeout(() => {
          setLoading(false)
        console.log(resp);
      }, 2000)
      setImage(resp?.data?.image.filename)
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
    setLoading(true)
    }

   const handleClickDeleteImage = async () => {
     try {
       const resp = await axios.post(UploadImageUrl+'/delete_image',{image} ,{withCredentials:true})
       console.log(resp);
       setImage('')
     } catch (error) {
      console.log(error);
     }
  }
  

  return (
    <Container >
    <Blog_Editor_Nav />
        <Form $maxwidth='900px' $margin='5rem auto' $position='relative'>

           {image ? 
           <Div $position='absolute' $top='-1.5rem' $right='2rem'>
             <CloseIcon onClick={handleClickDeleteImage} color='#000' size={20}/> 
            </Div> 
            : null}

          <Div $margin='2rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='4px solid rgba(0,0,0,0.05)' onClick={handleBannerUpload} >
                <Input ref={inputRef} onChange={UploadImageApi} $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg'  
                hidden />
                {loading ? <LoadingSpinner type={true}/> 
                :  
                <> 
                {image ? 
                <Image src={PUBLIC_IMAGES+image} $width="100%" $height='100%'/> 
                : 
                <CloudUpload  size={100} color='lightblue'/>
                } 
                </>}
           </Div>

          <Div $margin='2rem auto' $width='100%' $height='3rem' $border='.5px solid rgba(0,0,0,0.2)' >
                <Input $width='100%' $height='100%' placeholder='Title' $padding='0 0 0 1rem' $outline='none' $border='none' />
                {/* <hr style={{border:'solid .5px rgba(0,0,0,0.1)'}} /> */}
          </Div>
          {/* <Div id="editorjs"   >
             
          </Div> */}
           
          <ReactQuill value={value} onChange={(newValue)=>setValue(newValue)}  />

        </Form>
         <Toaster />
         <Button onClick={notify} >toaster</Button>
    </Container>
      
  )
}

export default Blog_Editor