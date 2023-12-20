import React from 'react'
import styled, { keyframes } from "styled-components";


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
transform: translateZ(0);
width: 35px;
height: 35px;
border-top: solid 4px rgba(0,0,0,0.1) ;
border-right:solid 4px rgba(0,0,0,0.1) ;
border-left:solid 4px rgba(0,0,0,0.1) ;
border-bottom : solid 4px rgba(0,0,0,1);
border-radius: 50%;
background-color: transparent;
`


const LoadingSpinner = ({$padding}) => {
  

  return ( 
    <Container $padding={$padding}>
         <Spinner />
         {/* {type === true ? <Text>Uploading</Text> :  <Text>Loading</Text>} */}

        
    </Container>
  );

}


export default LoadingSpinner