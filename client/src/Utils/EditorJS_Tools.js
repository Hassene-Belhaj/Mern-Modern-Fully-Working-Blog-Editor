
// install all  exemple  npm i @editorjs/inline-code

import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import axios from 'axios'
import { UploadImageUrl } from './Url'



const UploadImageApi = async(e) => {
    // const ToasterId = toast.loading('Loading')  
    const Data = new FormData()
    Data.append('image' , e.target.files[0])
    if (!e.target.files[0].name.includes( 'jpg' || 'png' || 'jpeg')) {
    //    toast.dismiss(ToasterId)
    //    toast.error('please upload a valid file format you can upload jpg , jpeg or png')
       return ;
    }
    try {
    const resp = await axios.post(UploadImageUrl+'/upload_image', Data ,{withCredentials:true})
        console.log(resp?.data?.data.url);
        setBlog({...blog , banner : resp?.data?.data.url})
    } catch (error) {
    // toast.error(error)
    console.log(error);
    }
    // toast.dismiss(ToasterId)
    // toast.success('image uploaded successfully')
    }


const editorUploadByUrl = (e) => {
 const Link = new Promise ((resolve , reject)=>{
    try {
        resolve(e)
    } catch (error) {
        reject(error)
    }
 })
 return Link.then(url => {
    return {
        success : 1 ,
        file : {url}
    }
 })
}

const editorUploadByFile = async (e) => {
        try {
        const resp = await axios.post(UploadImageUrl+'/upload_image', e ,{withCredentials:true})
            console.log(resp?.data?.data.url);
        } catch (error) {
        console.log(error);
        }
  
        }
    



export const Tools = {  
    embed : Embed ,
    list : {
        class : List ,
        inlineToolbar : true
    } ,
    image : {
        class : Image ,
        config : {
            uploader : {
                uploadByUrl : editorUploadByUrl,
                uploadByFile : editorUploadByFile , 
            }
        }
    } ,
    header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [2, 3, 4  ],
          defaultLevel: 3
        }
    },
    quote : Quote ,
    marker : Marker ,
    inlineCode : InlineCode ,
}
