import React from 'react'
import styled, { keyframes } from "styled-components";
import { Div, Image } from '../Global/GlobalStyle';


const Container = styled.div`
  padding: ${({$padding})=>$padding};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
`
const Text = styled.p`
`
const rotate360 = keyframes`
from  {
  transform  : rotate(0deg) ;
} 
to {
  transform:  rotate(360deg);
}
`





const Spinner = styled.div`
animation:${rotate360} 1s linear infinite;
/* transform: translateZ(0); */
width: 40px;
height: 40px;
border-top: solid 2.5px #818cf8 ;
border-right:solid 2.5px #818cf8;
border-left:solid 2.5px #818cf8 ;
border-bottom : solid 2px rgba(0,0,0,0);
border-radius: 50%;
background-color: transparent;
position: relative;
`


const LoadingSpinner = ({$padding}) => {
  

  return ( 
    <Container $padding={$padding}>
         <Spinner />
          <Div $position='absolute' $width='20px' $height='20px'>
             <Image $width='100%' $height='100%' src='logo.png' />
          </Div>
         {/* {type === true ? <Text>Uploading</Text> :  <Text>Loading</Text>} */}

        
    </Container>
  );

}


export default LoadingSpinner