import axios from "axios";
import { UrlBlog } from "./Url";

export const Filter_Pagination_Data = async( {create_new_array = false  , state , data , page , countRoute}) => {
 
     let object ; 

     if(arr !== null && !create_new_array){
        object = {...state , result : [...state.result , ...data] , page : page}
     } else {
       await axios.post(UrlBlog + countRoute , data , {withCredentials: true})
       .then(({data : {totalDocs} })=>{
          object = {result : data , page : 1 , totalDocs}
       })
       .catch((error)=>{
        console.log(error);
       })
     }
   
     return object ;
}