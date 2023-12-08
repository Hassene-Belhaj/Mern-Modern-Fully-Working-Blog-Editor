import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContext from './Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
      </BrowserRouter>
  </React.StrictMode>,
)
