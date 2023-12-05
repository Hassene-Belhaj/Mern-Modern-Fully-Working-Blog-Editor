import React from 'react'
import { GlobalStyleApp } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { Routes , Route } from 'react-router-dom'
import UserAuthForm from './Components/UserAuthForm'
import { useAuthContext } from './Context/AuthContext'
import Home from './Pages/Home'

const App = () => {
  const {isLoggedIn} = useAuthContext()

  return (
    <>
     <GlobalStyleApp/>
        <Navbar />
      <Routes>
          <Route path='/' element={<Home />} />  
          {isLoggedIn !== undefined ? null 
          :
           <>  
           <Route path='/signin' element={<UserAuthForm type={"sign-in"} />} />
           <Route path='/signup' element={<UserAuthForm type={"sign-up"} />} />
          </>
          }
         
      </Routes>
    </>
  )
}

export default App
