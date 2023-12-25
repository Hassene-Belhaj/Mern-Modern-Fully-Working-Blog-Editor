import React, { useEffect } from 'react'
import { Button, Div } from '../Global/GlobalStyle'


const LoadMoreDataBtn = ({state , handleLatestBlogApi }) => {

    console.log(state);

        if(state !== null && state.totalDocs > state.results.length) {
     
           return (
             <Div $width='90%' $margin='auto' $padding='1rem' >
                 <Button onClick={()=>handleLatestBlogApi({state : state.page + 1})} $outline='none' $border='.5px solid rgba(0,0,0,0.1)' $bg='transparent' $padding='8px' $br='5px' $fw='500'> load More</Button>
             </Div>
              ) 
           }
        
     }



export default LoadMoreDataBtn