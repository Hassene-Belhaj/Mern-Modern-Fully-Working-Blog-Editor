import React from 'react'
import { Form } from '../Global/GlobalStyle'
import toast, { Toaster } from 'react-hot-toast'




const Test = () => {

    

const handleForm =(e) => {
 e.preventDefault()   
   toast.loading('loading' , {duration : 3000})
}


  return (
    <>
    <Form onSubmit={handleForm}  $width='500px' $margin='auto' $display='flex' $jc='center' $ai='center' $fd='column' $gap='1rem' $padding='5rem 0'>
     <Toaster />
     <input name='email' placeholder='email'/>
     <input name='password' placeholder='password'/>
        <button>submit</button>
    </Form>
    </>
  )
}

export default Test