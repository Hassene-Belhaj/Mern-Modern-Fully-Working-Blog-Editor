import React from 'react'
import { Div, Navlink } from '../Global/GlobalStyle';
import { FaYoutube , FaInstagram , FaGithub , FaFacebook ,FaTwitter } from "react-icons/fa";
import { IconBase} from "react-icons/";


const AboutUser = ({social_links,joinedAt}) => {
    console.log(social_links  , joinedAt);
  return (
     <Div $display='flex' $jc='center' $gap='1rem'>
        {Object.keys(social_links).map((key,i)=>{
            let Nav_link = social_links[key]
            return Nav_link ? (
            <Navlink key={i} to={Nav_link} target='_blank' $color='#000' $td='none'>
                <FaFacebook />
            </Navlink> 
            ) : null
        }) }
     </Div>
  )
}

export default AboutUser