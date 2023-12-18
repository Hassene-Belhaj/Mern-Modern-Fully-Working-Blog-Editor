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
     const [isLoggedIn , setIsLoggedIn] = useState(undefined)

    const location =  useLocation()
    // console.log(location)

const CheckUserApi = async() => {
    try {
        const resp = await axios.get(Url+'/checkuser',{withCredentials:true})
        setIsLoggedIn(resp)
        console.log(resp);
    } catch (error) {
        return error
    }
}
     
useEffect(()=>{
CheckUserApi()
},[location])

  return (
    <Auth.Provider value={{isLoggedIn , CheckUserApi}}> 
        {children}
    </Auth.Provider>
  )
}

export default AuthContext 
export const useAuthContext = () =>useContext(Auth)