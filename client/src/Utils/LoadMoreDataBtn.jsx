import React, { useEffect } from 'react'
import { Button, Div } from '../Global/GlobalStyle'


const LoadMoreDataBtn = ({state , handleLatestBlogApi }) => {

    // console.log(state);

        if(state !== null && state?.totalDocs > state?.results?.length) {
     
           return (
             <Div $width='90%' $margin='auto'  $padding='2rem 0 0 1rem' >
                 <Button onClick={()=>handleLatestBlogApi({page : state.page + 1})}  $width='10rem' $height='40px'
                 $br='25px' $bg='transparent' $color='#000' $border='2px solid rgba(0,0,0,0.6)' $opacity='0.9' $fw="500" >Load More</Button>
             </Div>
              ) 
           }
        
     }



export default LoadMoreDataBtn