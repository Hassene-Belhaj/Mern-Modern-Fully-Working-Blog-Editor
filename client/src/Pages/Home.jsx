import React from 'react'
import { Container, Div } from '../Global/GlobalStyle'
import { useAuthContext } from '../Context/AuthContext'

const Home = () => {

  const {isLoggedIn} = useAuthContext()





  return (
    <Container $padding='5rem 0'>
        <Div>
        </Div>
    </Container>
  )
}

export default Home