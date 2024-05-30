import axios from "axios";
import { UrlBlog } from "./Url";




export const Filter_Pagination_Data = async ({create_new_array = false , state,data,page,countRoute, data_to_send = {}}) => {

   let obj ; 
    console.log(state);

   try {
    if(state !== null && !create_new_array ){
       obj = {...state , results : [...state.results, ...data ] , page }
      } else {
         const {data :{totalDocs}} = await axios.post(UrlBlog + countRoute , data_to_send)
         obj = {results : data , page : 1 ,totalDocs}
      }
   
   } catch (error) {
      console.log(error);
   }  
   
   return obj ;
}
 

