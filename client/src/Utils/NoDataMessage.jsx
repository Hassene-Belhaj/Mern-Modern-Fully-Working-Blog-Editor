import React from 'react'
import { Div, Text } from '../Global/GlobalStyle'

const NoDataMessage = ({message , $margin}) => {
  return (
    <Div $display='flex' $jc='center' $width='90%' $margin={$margin} $padding='1rem' $bg='#f3f5f9' $br='25px'>
          <Text>{message}</Text>
    </Div>
  )
}

export default NoDataMessage