
import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Navigation from './src/navigation';
import {firestore} from './src/Firestore_Setup';
import {getFirestore,collection,addDoc} from 'firebase/firestore';
const App = () => {
const addToDatabase = async (e) => {

        try {
            const docRef = await addDoc(collection(firestore, "test"), {
              userData: "password",
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

   //adds an entry then posts done, not needed but test code please please please don't delete this please please please
useEffect(()=>{
addToDatabase().then(()=>console.log("done"));
},[])

  return (
    <Navigation/>
  );
};
// const [varName, setVarname]=useState()
// to update, setVarname(name)

export default App;
