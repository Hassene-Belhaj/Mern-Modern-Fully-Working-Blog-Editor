import React from 'react'
import { useParams } from 'react-router'

const UserPage = () => {

    const {id} = useParams()
    console.log(id);

  return (
    <div>UserPage</div>
  )
}

export default UserPage