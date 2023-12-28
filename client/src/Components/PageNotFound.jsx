import React from 'react'
import { Div, Image, Nav, Navlink, Section, Text, Title } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'

const PageNotFound = () => {
  return (
     <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} exit={{opacity : 0}} transition={{duration: 0.8}}>
        <Section $padding='2rem 0' $width='90%' $height='800px'  $display='flex' $fd='column' $jc='space-between' $margin='auto' $gap='1rem' > 

        <Div>
           <Div $width='20rem' $height='20rem' $margin='auto'>
                <Image $width='100%' $height='100%' src='/404.png' $of='cover'/>
           </Div>
                <Title $ta='center' $padding='1rem' $fs='2rem' $fw='400'>Page not Found</Title>
                <Text $ta='center' $padding='1rem'>The Page You are looking for is not exists , Head Back To
                    <Navlink to="/" $margin='0 0 0 .5rem' $color='#000' >Home Page</Navlink> 
                </Text>
        </Div>
            
           <Div $width='10rem' $height='10rem' $display='flex' $ai='center' $margin='auto'>
                 <Div $width='2rem' $height='2rem' $margin='auto'>
                     <Image $width='100%' $height='100%' src='/logo.png' />
                </Div>
                     <Text $fs='1.1rem'>Blog Space</Text>
            </Div> 
        </Section>
     </AnimationWrapper>
  )
}

export default PageNotFound