import React from 'react'
import { Button, Container, Div, Form, Section } from '../Global/GlobalStyle'
import { useState } from 'react'




const Test = () => {

  const Btn = ['Test' , 'Tech' , 'Cooking'  , 'Marketing' , 'Digital' ]
  
  const [btnValue , setBtnValue] = useState(null)
  
  const handleClick = (e) => {
    let Value = e.target.innerText
    setBtnValue(Value)
  }

// const [pageNbr , setPageNbr] = useState(2)

// const result = new Array(pageNbr).fill(null).map((item , i)=>i)
// console.log(result);



  // return (
  //   <>
  //   {/* <Form onSubmit={handleForm}  $width='500px' $margin='auto' $display='flex' $jc='center' $ai='center' $fd='column' $gap='1rem' $padding='5rem 0'>
  //    <input name='email' placeholder='email'/>
  //    <input name='password' placeholder='password'/>
  //       <button>submit</button>
  //   </Form> */}
  //   <Container $display='flex' $jc='center' $padding='4rem 0' $gap='1rem'>
  //     {/* {Btn.map((btn,i)=> {
  //       return (
  //         <Button onClick={handleClick} $bg={btn === btnValue ? '#e5e5e5' : 'transparent' } key={i} $padding='10px 1rem' $br='25px' >{btn}</Button>
  //       )
  //     })} */}
  
  //     {/* <Div $width='900px'  $bg='yellow'>s</Div>
  //     <Div $width='900px'  $bg='indigo'>ss </Div> */}
  //   </Container>
  //   </>
  // )
  return (
    <Container $display='flex' $height='100vh' $fd='column' $MD_fd='row'  >

          <Section $flex='2' $bg='#d5d5d5' $MD_order='0' $SM_order='1' $XS_order='1' > 
                    ss
          </Section>

          <Section $flex='1' $bg='#f3f5f9'>
ss
          </Section>


    </Container>
  )
}

export default Test