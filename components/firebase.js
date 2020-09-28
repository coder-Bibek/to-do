import firebase from "firebase";
import "firebase/firestore";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDWX9-BfTE4sT_93jRwMgiF3h_7wo8hqHw",
  authDomain: "to-do-d06a8.firebaseapp.com",
  databaseURL: "https://to-do-d06a8.firebaseio.com",
  projectId: "to-do-d06a8",
  storageBucket: "to-do-d06a8.appspot.com",
  messagingSenderId: "1099381027887",
  appId: "1:1099381027887:web:b0bc28d70f6adb4f6482da",
  measurementId: "G-X2VBF3EFBW",
});
const db = firebaseApp.firestore();
export default db;
