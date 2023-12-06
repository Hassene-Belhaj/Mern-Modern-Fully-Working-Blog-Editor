import { initializeApp } from "firebase/app";
//
import { GoogleAuthProvider , getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDs-7g3Rp1OmMzcq2J2-jvtSoDQU0KKop8",
  authDomain: "mern-fully-working-blog-editor.firebaseapp.com",
  projectId: "mern-fully-working-blog-editor",
  storageBucket: "mern-fully-working-blog-editor.appspot.com",
  messagingSenderId: "803793172187",
  appId: "1:803793172187:web:8b436151ba0e217226befe"
};

const app = initializeApp(firebaseConfig);
 //
 export const Auth = getAuth(app)
 export const Provider = new GoogleAuthProvider



export const FirebaseAuth = async () => {
       let user = null
    try {
        const resp = await signInWithPopup(Auth , Provider)
        user = resp.user
    } catch (error) {
        console.log(resp);
    }
    return user
} 
