import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc,getDoc} from 'firebase/firestore';

const CreateAccountScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const onContinuePressed = async() => {

    const usersRef = doc(firestore,`userData/${email}`);
     var p = await getDoc(usersRef)

    console.log("UserData: "+ p.exists());

      if(p.exists()){

        console.warn("This email is already in use.");
      }
      else{
      if (email.trim() === "" || username.trim() === "" || name.trim() === "") {
              // If either email or username is blank, do not navigate to the next screen
              console.warn("Email, name, and username are required.");
            } else if (email.length>30||username.length>15||name.length>40) {
                console.warn("Too long.");
            }
            else {

              // If both email and username are provided, navigate to the next screen
              // check if the email or username, already exists in the database.
              console.log(name, username, email);
              navigation.navigate('CreateAccount2', { email: email, name: name, username: username });
            }
          };

      }



   return (
            <View style={styles.page}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
              <Text style={styles.appName}>fit check</Text>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../assets/arrow2.png')} style={styles.back} />
              </TouchableOpacity>
              <CustomInput placeholder="email address" value={email} setValue={setEmail} />
              <CustomInput placeholder="name" value={name} setValue={setName} />
              <CustomInput placeholder="username" value={username} setValue={setUsername} />
              <CustomButtonPrimary text="continue" onPress={onContinuePressed}/>

            </View>

      );
};

    const styles = StyleSheet.create({
      page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#DCF0C8', // Change the background color of the page here
      },
      logo: {
        width: 200,
        height: 200,
        marginTop: -150,
      },
      appName: {
        color: '#3B593B',
        fontSize: 48,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 30,
      },
      back: {
        height: 45,
        width: 45,
      },
      backArrow: {
        right: 160,
      },
    });

export default CreateAccountScreen