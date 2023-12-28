import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'
import { Url } from '../Utils/Url';
import { useEffect } from 'react';
import { Button, Container, Div, Image, Navlink, Section, Text, Title } from '../Global/GlobalStyle';
import { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';
import AnimationWrapper from '../Utils/AnimationWrapper';
import { useAuthContext } from '../Context/AuthContext';
import AboutUser from '../Components/AboutUser';

const profile_data_structure = {
    personal_info : {
        fullname : "" ,
        username : "" ,
        profile_img : "" ,
        bio : "" ,
    } ,
    account_info : {
        total_posts : 0 ,
        total_reads : 0 ,  
    },
    social_links : {} ,
    joinedAt : ""
}


const UserPage = () => {

          const {isLoggedIn , CheckUserApi} =   useAuthContext()

        //   console.log(isLoggedIn?.data?.user.id); // _id from checkuser
          
          const {id : profileID} = useParams()
        //   console.log(profileID);

        const [profile , setProfile] = useState(profile_data_structure)
        const [loading ,setLoading] = useState(true)

        const {personal_info : {fullname , username , profile_img , bio} , account_info : {total_posts , total_reads} , social_links  , joinedAt , _id} = profile
        
        // console.log(_id);
        
        
        
    const fetch_Profile_user = async () => {
        try {
            const {data} = await axios.post(Url+'/user',{username : profileID})
            setProfile(data.resp)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    
    } 

        useEffect(()=>{  
        fetch_Profile_user()
        },[profileID])


        return (
                <AnimationWrapper initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.8}} exit={{opacity : 0}} key={loading}  >
            <Container>
                    {loading ? 
                    <LoadingSpinner $padding='4rem 0'/>
                    :
                    <Text $padding='2rem'>Profile Page - {fullname}</Text>
            }
                <Section>
                    <Div $width='10rem' $height='10rem' $br='50%' $margin='auto'>
                        <Image $width='100%' $height='100%' $br='50%' src={profile_img} />
                    </Div>
                     <Title $ta='center' $margin='1rem'>@{fullname}</Title>
                     <Text $ta='center' $margin='1rem'>{fullname}</Text>

                     <Div $margin='auto'>
                        <Text $ta='center' $margin='1rem'>{total_posts.toLocaleString()} Posts - {total_reads.toLocaleString()} Reads</Text>
                        <Navlink to='/setting/edit_profile' $color='#000' $td='none'>
                         {isLoggedIn?.data?.user?.id === _id ?  <Button $display='flex' $jc='center' $margin='2rem auto' $padding='.5rem 1rem' $bg='transparent' $br='25px' >Edit Profile</Button>
                        :
                        null 
                        
                        }    
                       
                        </Navlink>
                     </Div>
                     
                     <AboutUser   social_links={social_links}  joinedAt={joinedAt} />
                </Section>

            </Container>
                </AnimationWrapper>
        )
        }

        export default UserPage