import React from 'react'
import { Div, Text } from '../Global/GlobalStyle'

const DateFormat = ({joinedAt}) => {

    // console.log(joinedAt);

  return (
    <Div $display='flex' $jc='center' $padding='1rem 0'>
        <Text $fs='0.8rem' $ta='center'>
          <strong> Joined On  : </strong> {new Date(joinedAt).toString().slice(0,15)}
        </Text>
    </Div>
  )
}

export default DateFormat