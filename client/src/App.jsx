import React from 'react'
import { GlobalStyleApp } from './Global/GlobalStyle'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
     <GlobalStyleApp/>
      <Navbar />
    </Router>
  )
}

export default App
