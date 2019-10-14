import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAaXw2lK_KiOjIkb3pJUc-BrX58_4fba2s",
  authDomain: "money-transfer-app-48d0f.firebaseapp.com",
  databaseURL: "https://money-transfer-app-48d0f.firebaseio.com",
  projectId: "money-transfer-app-48d0f",
  storageBucket: "money-transfer-app-48d0f.appspot.com",
  messagingSenderId: "796454446584",
  appId: "1:796454446584:web:2969a1dc2ee108c8a8e20d",
  measurementId: "G-2TB11FQ732"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
