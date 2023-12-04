import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { Url } from '../Utils/Url'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router'




const Auth = createContext()


const AuthContext = ({children}) => {
     const [cookiePrescence , setCookiePrescence] = useState(false)

     

const CheckUserApi = async() => {
    try {
        const resp = await axios.get(Url+'/checkuser',{withCredentials:true})
        console.log(resp);
        setCookiePrescence(true)
    } catch (error) {
        console.log(error);
    }
}
     
useEffect(()=>{
CheckUserApi()
},[cookiePrescence])

  return (
    <Auth.Provider value={{cookiePrescence , setCookiePrescence}}> 
        {children}
    </Auth.Provider>
  )
}

export default AuthContext 
export const useAuthContext = () =>useContext(Auth)