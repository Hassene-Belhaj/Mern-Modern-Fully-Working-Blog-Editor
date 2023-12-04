import React from 'react'
import { GlobalStyleApp } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import UserAuthForm from './Components/UserAuthForm'
import AuthContext from './Context/AuthContext'
import Home from './Pages/Home'

const App = () => {
  return (
    <Router>
      <AuthContext>
     <GlobalStyleApp/>
        <Navbar />
      <Routes>
          <Route path='/' element={<Home />} />     
          <Route path='/signin' element={<UserAuthForm type={"sign-in"} />} />
          <Route path='/signup' element={<UserAuthForm type={"sign-up"} />} />
      </Routes>
      </AuthContext>
    </Router>
  )
}

export default App
