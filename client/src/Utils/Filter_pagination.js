import axios from "axios";
import { UrlBlog } from "./Url";
import { Button } from "../Global/GlobalStyle";




export const Filter_Pagination_Data = async({create_new_array = false  , state , data , page , countRoute, data_to_send = {}   }) => {
 
   let object ; 

   if(state !== null && !create_new_array){
      object = {...state , results : [...state.results, ...data ] , page}

   } else {
    const {data : {totalDocs}} = await axios.post(UrlBlog + countRoute , data_to_send)
    object = {results : data , page ,totalDocs}
     }
   
 
   return object ;
}


