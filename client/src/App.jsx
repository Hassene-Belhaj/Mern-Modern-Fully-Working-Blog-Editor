import React from 'react'
import {DarkModeIcon, GlobalStyleApp, LightModeIcon } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { Routes , Route, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from './Context/AuthContext'
import UserAuthForm from './Components/UserAuthForm'
import Editor from './Pages/Editor'
import Test from './Components/Test'
import Home from './Pages/home'
import BlogPage from './Pages/BlogPage'
import SearchPage from './Pages/SearchPage'

const App = () => {
  const location = useLocation()
  const {isLoggedIn} = useAuthContext()
   
  const dark = {
    background : '#000' ,
    // color : '#fff'
  }

  const light = {
    background : '#fff',
    // color : '#000'
  }
   



  return (
  <>
     {/* <Test/> */}
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
        <Route path='/blog/:id' element={< BlogPage />} />  
        <Route path='/editor' element={< Editor/>} />
        <Route path='/search/:query' element={< SearchPage/>} />
     </Routes> 
  </>
    )
  }
  
  export default App
