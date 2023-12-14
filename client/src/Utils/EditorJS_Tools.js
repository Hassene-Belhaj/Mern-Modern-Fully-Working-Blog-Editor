
// install all  exemple  npm i @editorjs/inline-code

import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'


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
                uploadByUrl : ,
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
