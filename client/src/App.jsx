import React from 'react'
import {GlobalStyleApp } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { Routes , Route, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from './Context/AuthContext'
import UserAuthForm from './Components/UserAuthForm'
import Editor from './Pages/Editor'
import Home from './Pages/Home'
import Test from './Components/Test'

const App = () => {
  const {isLoggedIn} = useAuthContext()

   const location = useLocation()

  return (
 
  <>
   <GlobalStyleApp/>
     {location.pathname === '/editor' ? null : <Navbar />}
 
     <Routes>
        {isLoggedIn !== undefined ? null 
        :
        <>
          <Route path='/signin' element={<UserAuthForm type={"sign-in"} />} />
          <Route path='/signup' element={<UserAuthForm type={"sign-up"} />} />
        </>
        }      
        <Route path='/' element={< Home />} />  
        <Route path='/editor' element={< Editor/>} />
     </Routes>
     {/* <Test /> */}
  </>
    )
  }
  
  export default App
