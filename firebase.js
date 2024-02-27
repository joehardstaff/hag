// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDaSWb87sld03gt6OlUddQB29ujV_EO9Ss",
  authDomain: "college-hag.firebaseapp.com",
  projectId: "college-hag",
  storageBucket: "college-hag.appspot.com",
  messagingSenderId: "47444732432",
  appId: "1:47444732432:web:2f27910dfe6a9f2e573895",
  measurementId: "G-1ZQZV5RWKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);