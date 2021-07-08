import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyCkTJ8Z_Mb8LWepJJrNY-LKCROrsu_PKgY",
    authDomain: "otp-app-ec35e.firebaseapp.com",
    projectId: "otp-app-ec35e",
    storageBucket: "otp-app-ec35e.appspot.com",
    messagingSenderId: "386847684285",
    appId: "1:386847684285:web:23328d1e8900ee8a9369d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;