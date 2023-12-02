import React from 'react'
import { GlobalStyleApp } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import UserAuthForm from './Components/UserAuthForm'

const App = () => {
  return (
    <Router>
     <GlobalStyleApp/>
        <Navbar />
      <Routes>
          <Route path='/signin' element={<UserAuthForm type={"sign-in"} />} />
          <Route path='/signup' element={<UserAuthForm type={"sign-up"} />} />

      </Routes>
    </Router>
  )
}

export default App
