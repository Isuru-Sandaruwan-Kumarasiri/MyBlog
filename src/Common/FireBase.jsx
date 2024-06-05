// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAEbIourQBgNd_1DfQ0Cw-S8lFSTJC77U",
  authDomain: "myblog-mearn-stack.firebaseapp.com",
  projectId: "myblog-mearn-stack",
  storageBucket: "myblog-mearn-stack.appspot.com",
  messagingSenderId: "641171610973",
  appId: "1:641171610973:web:afe1453596e018b43adcb4",
  measurementId: "G-5B1JCHVJYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const provider=new GoogleAuthProvider();

const auth=getAuth();

export  const authWithGoogle=async()=>{
    let user=null;

    await signInWithPopup(auth,provider)
    .then((reult)=>{
        user=result.user

    })
    .catch((err)=>{
        console.log(err)
    })
    return user
}