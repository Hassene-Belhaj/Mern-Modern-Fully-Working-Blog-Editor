import React from 'react'
import { Container, DarkModeIcon, Div, Form, LightModeIcon } from '../Global/GlobalStyle'




const Test = () => {

    

const handleForm =(e) => {
 e.preventDefault()   
}




  return (
    <>
    {/* <Form onSubmit={handleForm}  $width='500px' $margin='auto' $display='flex' $jc='center' $ai='center' $fd='column' $gap='1rem' $padding='5rem 0'>
     <input name='email' placeholder='email'/>
     <input name='password' placeholder='password'/>
        <button>submit</button>
    </Form> */}
    <Container $display='flex'>
      {/* <Div $width='900px'  $bg='yellow'>s</Div>
      <Div $width='900px'  $bg='indigo'>ss </Div> */}
    </Container>
    </>
  )
}

export default Test