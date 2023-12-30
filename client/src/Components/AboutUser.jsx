import React from 'react'
import { Div, Navlink } from '../Global/GlobalStyle';
// import { FaYoutube , FaInstagram , FaGithub , FaFacebook ,FaTwitter } from "react-icons/fa"
import  * as FontAwesome from "react-icons/fa"




const AboutUser = ({social_links,joinedAt}) => {

    const TransformKey = (key) => {
        const SliceFirstLetter = key.slice(1)   
        const TransformString = key.charAt(0).toUpperCase() + SliceFirstLetter
        return TransformString
    }



  return (
     <Div $display='flex' $jc='center'>

        {Object.keys(social_links).map((key,i)=>{
            let Nav_link = social_links[key]
            return Nav_link ? (
            <Navlink key={i} to={Nav_link} target='_blank' $color='#000' $td='none'>
               <Div $display='flex' $jc='center' $fs='25px' $padding='2rem 1rem' >
                    {React.createElement(FontAwesome[`Fa${TransformKey(key)}`])}
               </Div>          
            </Navlink> 
            ) : null
        }) }
     </Div>
  )
}

export default AboutUser