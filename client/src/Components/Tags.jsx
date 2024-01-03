import React from 'react'
import { Button, Div, Text } from '../Global/GlobalStyle'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'
import { useEditorContext } from '../Context/EditorContext'


const IconClose = styled(AiOutlineClose)`
margin-left: 1rem;
`



const Tags = ({tag,index}) => {

  const {blog , blog :{ tags }, error , setError  , setBlog} = useEditorContext()
  
  const handleClose = (index) => {
    const FindTag = blog.tags.filter((_item,i)=>i !== index)
    setBlog({blog , tags : FindTag })
  }


  const addEditable=(e)=> {
    e.preventDefault()
    e.target.setAttribute('contentEditable' , true)
    e.target.focus()
  } 

  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault()
      let currentTag = e.target.innerText
      tags[index] = currentTag
      setBlog({...blog , tags : [...tags]})
      e.target.setAttribute('contentEditable' , false)
    }
  }

  return (
       <Button $fw='700' $width='auto' $padding='4px' $br='25px' $display='flex' $jc='center' $ai='center'  $bg='#fff' $border='none' $opacity='0.9'  
       onClick={addEditable} onKeyDown={handleTagEdit}>
           <Text $bgf='#d5d5d5' $tt='capitalize' $outline='none' $margin='0 0 0 8px'>{tag}</Text>
           <IconClose color='#000' onClick={()=>handleClose(index)}   />
       </Button>      
  )
}

export default Tags



