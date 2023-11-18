import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

console.log(process.env.API)
const firebaseConfig = {

  apiKey: "AIzaSyA_tBhJ4UmqC4dsDsQ6uKjEchZECEXtOgI",
  authDomain: "fitcheck-8c417.firebaseapp.com",
  projectId: "fitcheck-8c417",
  storageBucket: "fitcheck-8c417.appspot.com",
  messagingSenderId: "456974914275",
  AppId: "1:456974914275:android:797dd0c5624853b3a0abd6",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)