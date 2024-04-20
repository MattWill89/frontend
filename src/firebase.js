import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDFG6fL_sEcLvxTOXrlVTFynz9bLMtXQJQ",
    authDomain: "finalproject-75328.firebaseapp.com",
    projectId: "finalproject-75328",
    storageBucket: "finalproject-75328.appspot.com",
    messagingSenderId: "17330103016",
    appId: "1:17330103016:web:896cdcd8becedea7cf1f5d",
    measurementId: "G-JL174S90D7"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth(); 
export default app;