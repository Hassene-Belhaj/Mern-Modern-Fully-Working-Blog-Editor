import React from 'react'
import { Button, Div, Text } from '../Global/GlobalStyle'

const Categories = ({loadingBlogByTagCategory,pageState}) => {
    const Categories =['Programming' , 'Hoolywood' , 'Film making' , 'Social media' , 'Cooking' , 'Tech' ,'Test', 'Finance' , 'Travel'] 
  return (
            <Div $display='flex' $width='70%' $gap='1rem' $fw='wrap' $padding='2rem 0 0 0' >
                
                {Categories.map((cat , i)=> {
                    return (
                    <Button key={i} onClick={loadingBlogByTagCategory} $width='auto' $padding='10px' $br='25px' $display='flex' $jc='center' $ai='center' $bg={cat.toLowerCase() === pageState ? '#000' 
                    : 
                    '#f3f5f9'} $color={cat.toLowerCase() === pageState ? '#fff' : '#000'} $border='none' $opacity='0.9' $transition='all ease-in-out 0.3s'>
                        <Text $tt='capitalize' $outline='none' $fw='400'>{cat}</Text>
                    </Button>
                    )
                    })}
            </Div> 
            )
}

export default Categories