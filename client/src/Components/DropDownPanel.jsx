import React from 'react'
import AnimationWrapper from '../Utils/AnimationWrapper'
import { Button, Div, Navlink, Text, Title} from '../Global/GlobalStyle'
import { CiVolumeHigh } from 'react-icons/ci'



const DropDownPanel = ({showPannel,userInfo , handleLogoutApi}) => {

    
     
    return (

      <AnimationWrapper initial={{opacity : 0 }} animate={{opacity : 1}} exit={{opacity : 0}} transition={{duration : 0.3}} key={showPannel}>

        
        <Div $display='flex' $fd='column' $jc='center' $ai='center' $width='18rem' $height='auto' $bg='#fff' $position='absolute' $top={showPannel ? '80px' : '-500px'}  $right='6px' $z='1' $boxShadow='rgba(0,0,0,0.2) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px' style={{borderBottomLeftRadius:'8px' , borderBottomRightRadius:'8px' }} $gap='.5rem' $padding='1rem 0' >

                 <Div $display='flex' $jc='center' $ai='center' $width='100%' $height='3rem' $bgh='#f3f5f9'  $cursor='pointer'$transition='all ease-in-out 0.3s'> 
                   <Text $fs='.9rem' $fw='600'>@{userInfo?.fullname}</Text>
                 </Div>

                 {/* <Div $display='flex' $jc='center' $ai='center'  $width='100%' $height='3rem' $gap='.5rem' $cursor='pointer' $bgh='#f3f5f9' $transition='all ease-in-out 0.3s'> 
                    <WriteIcon />
                    <Text>Write</Text>
                 </Div> */}

                  <Navlink to={`/user/${userInfo?.username}`} $width='100%' $color='#000' $td='none'>
                      <Div $display='flex' $jc='center' $ai='center'  $width='100%' $height='3rem'  $bgh='#f3f5f9' $cursor='pointer' $transition='all ease-in-out 0.3s'> 
                        <Text $ta='center'>Profile</Text>                 
                      </Div>
                  </Navlink>

                 <Div $display='flex' $jc='center' $ai='center'  $width='100%' $height='3rem' $bgh='#f3f5f9' $cursor='pointer' $transition='all ease-in-out 0.3s'> 
                   <Text >Dashboard</Text>
                 </Div>

                 <Div $display='flex' $jc='center' $ai='center' $width='100%' $height='3rem' $bgh='#f3f5f9'  $cursor='pointer'$transition='all ease-in-out 0.3s'> 
                   <Text $ta='center'>Settings</Text>
                 </Div>

                 <Div $display='flex' $jc='center' $ai='center' $width='100%' $height='3rem' $cursor='pointer' $padding='2rem 0' > 
                    <Button onClick={handleLogoutApi} $width='8rem' $height='40px' $br='25px' $bg='#000' $color='#fff' $border='none' $opacity='0.8'>Log Out</Button>
                 </Div>


            </Div>
        </AnimationWrapper >
          
  )

}

export default DropDownPanel