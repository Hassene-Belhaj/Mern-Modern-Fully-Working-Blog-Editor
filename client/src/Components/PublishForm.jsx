import React, { useState } from 'react'
import { Button, Container, Div, Form, Image, Input, Span, Text, TextArea, Title } from '../Global/GlobalStyle'
import LoadingSpinner from '../Utils/LoadingSpinner'
import { useEditorContext } from '../Context/EditorContext'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'
import Tags from './Tags'
import toast, { Toaster } from 'react-hot-toast'
import { Url, UrlBlog } from '../Utils/Url'
import axios from 'axios'
import { useAuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router'



const IconClose = styled(AiOutlineClose)`
`

const PublishForm = () => {

  const navigate = useNavigate()

  const {isLoggedIn , CheckUserApi} = useAuthContext()
   
  console.log(isLoggedIn.data.user.id);

  const {beditorState , setEditorState , title , setTitle ,banner , setBanner ,content ,
    setContent , desc , setDesc , tags , setTags , author , setAuthor , error , setError } = useEditorContext()
  const [tag , setTag] = useState('')


  let textLength = 200
  let DescLength = 200


  const handleCreateBlogPostApi = async (e) => {
    e.preventDefault()
   if(!title.length) return toast.error('you must provide a Title to publish this Post')
   if(!banner.length) return toast.error('you must provide blog banner to publish the blog')
   if(!desc.length || desc.length > DescLength) return toast.error('you must provide blog description under 200 characters')
   if(!content.length) return toast.error('there must be some blog content to publish it')
   if(!tags.length) return toast.error('Enter at least 1 tag to help us rank your blog')
   if(tags.length >= 10) return toast.error('provide tags to publish the blog , maximum 10')
    
   const Data = {
    title , banner , desc , tags , content ,  author : isLoggedIn?.data?.user.id, draft : false,
   }
  
   const ToastLoading = toast.loading('Loading')
  try {
    const resp = await axios.post(UrlBlog+ '/create_blog' , Data , {withCredentials : true} )
    console.log(resp);
    if(resp.status === 200) {
      setTimeout(() => { navigate('/') }, 1000)
    }

  } catch (error) {
    console.log(error);
    toast.error(error)
  }
  toast.dismiss(ToastLoading)
  toast.success('Published')

  }




const handleClose = () => {
  setEditorState('editor')
}


const handleKeyDown =(e)=> {
  if(e.keyCode === 13 || e.keyCode === 188 ) {
    e.preventDefault()
    if(tag.length > 1) {
      setTags([...tags , tag])
      setTag('')

    }
  }
  if(tags.length >= 11) {
    e.preventDefault()
    setError('You can add max 10 tags')
    setTags([...tags])
  }
}




  return (
    <Container $padding='2rem' $position='relative' >
       <IconClose  onClick={handleClose} style={{position:'absolute' , top:'3rem' , right:'3rem'}} />

    <Form $maxwidth='900px' $margin='5rem auto' $position='relative' onSubmit={(e)=>e.preventDefault()} >
       <Toaster />

      <Div $margin='2rem 0' $height='400px'  $display='flex' $jc='center'  $ai='center'   $border='4px solid rgba(0,0,0,0.05)' >
            <Input  $width='100%' $outline='none' type="file" accept='.png , .jpg , .jpeg'  hidden />
        
            {banner? <Image src={banner} $width="100%" $height='100%'/> : <Text>upload image</Text> }
            
       </Div>
         
         {/* <Title $fs='1rem' $fw='500'>Blog Title</Title> */}

         <Div $margin='2rem 0 0 0' $width='100%' height='auto'  $border='none' $fs='3rem' $display='flex' $jc='center' $ai='center'  >
              <TextArea  $width='100%' $height='100%'  $fs='1.2rem'  $tt='capitalize' $resize="none"  placeholder='Blog Title'  name='title' $outline='none' $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' $padding='1rem' $br='7px' value={title} onChange={e=>setTitle(e.target.value)} ></TextArea>
          </Div> 

          <hr style={{margin:'0 0 .5rem 0', border:'.5px solid rgba(0,0,0,0.05)'}} />

          <Div $display='flex' $jc='end'>
           {textLength - title?.length ? <Text $fs='0.8rem' $color={textLength - title?.length >= 0 ? '#000' : 'red'} > {textLength - title?.length} characters left </Text>
           : 
           null 
          } 
          
          </Div>

        <Title $margin='1rem 0' $fs='.9rem' $fw='500'>Short Description About Your Blog</Title>

      <Div>
          <TextArea  $width='100%' $height='10rem' $resize='none' $padding='1rem' $outline='none'  $br='7px' value={desc}  $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8'
          textLength={DescLength} onChange={e=>setDesc(e.target.value)} $bg='#f3f5f9' > </TextArea>
      </Div> 

      <Div $display='flex' $jc='end'>
      {DescLength - desc?.length ? <Text $fs='0.8rem'  $color={DescLength - desc?.length >= 0 ? '#000' : 'red'}> {DescLength - desc?.length } characters left </Text> : null } 
         
      </Div>

      <Div>
        <Title $margin='2rem 0' $fs='.9rem' $fw='500' > Topics - (Help is searching and ranking your Blog Post) </Title>

        <Div $margin='2rem 0 0 0' $height='100%'  $bg='#f3f5f9'  $border='none'  $padding='1.5rem' $br='7px'  >

            <Input onSelect={()=>setError('')}  $width='100%' $height='3rem'  $outline='none' $bg='#fff' $br='7px' $padding='8px' $margin='1rem 0'
             $border='2px solid rgba(0,0,0,0)'  $borderF='2px solid #818cf8' type='text' placeholder='Add Tag' onKeyDown={handleKeyDown} 
             value={tag} onChange={e=>setTag(e.target.value)} />

                <Div $width='100%' $display='flex'$gap='1rem' $fw='wrap'>
                    {tags.map((item,index)=>{
                      return (
                        <Div key={index} $display='flex'>
                          <Tags tag={item} index={index} setTag={setTag} />
                        </Div>
                        )
                      })}
                </Div> 
                    <Text  $fs='0.9rem' $color='red' $margin='2rem 0' $ta='center'>{error? error : null}</Text>

       </Div>
                    <Text $fs='0.8rem' $color='#000' $margin='.5rem 0' $ta='right'>{10 - tags.length} Tags left</Text>
      </Div>
        <Button onClick={handleCreateBlogPostApi} $width='100%' $height='40px' $margin='2rem 0' $br='7px' $bg='#000' $color='#fff' $border='none' $opacity='0.8'>Post</Button>

    </Form>
</Container>
  )
}

export default PublishForm