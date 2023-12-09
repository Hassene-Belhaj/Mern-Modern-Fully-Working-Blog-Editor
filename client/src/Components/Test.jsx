import React from 'react'
import { Form } from '../Global/GlobalStyle'
import { useRef } from 'react'

const Test = () => {

    

const handleForm =(e) => {
 e.preventDefault()   
 const formData = new FormData(e.target)
 const data = Object.fromEntries(formData)
 console.log(data);

}


  return (
    <Form onSubmit={handleForm}  $width='500px' $margin='auto' $display='flex' $jc='center' $ai='center' $fd='column' $gap='1rem' $padding='5rem 0'>
     <input name='email' placeholder='email'/>
     <input name='password' placeholder='password'/>
        <button>submit</button>
    </Form>
  )
}

export default Test