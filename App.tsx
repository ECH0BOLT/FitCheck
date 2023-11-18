
import React,{useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Navigation from './src/navigation';
import {firestore} from './src/Firestore_Setup';
import {getFirestore,collection,addDoc} from 'firebase/firestore';
const App = () => {
const ref = collection(firestore, "test")
console.log(ref)

const addToDatabase = async (e) => {

        try {
            const docRef = await addDoc(collection(firestore, "test"), {
              userData: "userData",
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
useEffect(()=>{
addTodo().then(()=>console.log("done"));
},[])
  return (
    <Navigation/>
  );
};
const [varName, setVarname]=useState()
to update, setVarname(name)

export default App;
