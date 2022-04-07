// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"; 
// import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCUjFKfWcmsPmIcjohaKPMBWmLHffCs22Q",
//   authDomain: "intelihealth-6edaf.firebaseapp.com",
//   projectId: "intelihealth-6edaf",
//   storageBucket: "intelihealth-6edaf.appspot.com",
//   messagingSenderId: "772277287209",
//   appId: "1:772277287209:web:0436c3d2797f0b071f1f38",
//   measurementId: "G-4P6LRNW5M2"
// };

// // Initialize Firebase
// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else{
//   app = firebase.app();
// }
  
// const auth = firebase.auth();
// const firestore = app.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithRedirect(provider);

// // export {signInWithGoogle}

// export default firebase; 

import { initializeApp } from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUjFKfWcmsPmIcjohaKPMBWmLHffCs22Q",
  authDomain: "intelihealth-6edaf.firebaseapp.com",
  projectId: "intelihealth-6edaf",
  storageBucket: "intelihealth-6edaf.appspot.com",
  messagingSenderId: "772277287209",
  appId: "1:772277287209:web:0436c3d2797f0b071f1f38",
  measurementId: "G-4P6LRNW5M2"
};

initializeApp(firebaseConfig);
