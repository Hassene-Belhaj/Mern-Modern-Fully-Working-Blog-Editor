import React from 'react'
import { Div, Image, Navlink, Title } from '../Global/GlobalStyle'
import AnimationWrapper from '../Utils/AnimationWrapper'

const UsersCards = ({users}) => {


  return (
    <Div  $padding='1rem 0'>

         {users.map(({personal_info : {fullname , username , profile_img}},i)=> {

            return (
              <Navlink key={i} $color='#000' $td='none' to={`/user/${username}`}>
                <AnimationWrapper  initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8  , delay : 0.2}}>
                      <Div $display='flex' $jc='start'  $ai='center' $gap='2rem' $padding='1rem' > 
                          <Div $width='2rem' $height='2rem' $br='25px'>
                              <Image $width='100%' $height='100%' $br='25px' src={profile_img} />
                          </Div>
                      <Div>
                          <Title $fs='1rem' $fw='600'>{username}</Title>
                          <Title $fs='0.9rem' $fw='400'>@{fullname}</Title>  
                      </Div>    
                      </Div>
                </AnimationWrapper>
              </Navlink>
            )
         })}
       
    </Div>
  )
}

export default UsersCards