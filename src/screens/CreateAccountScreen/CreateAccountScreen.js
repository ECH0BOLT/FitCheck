import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {firestore} from './src/Firestore_Setup';
import {getFirestore,collection,addDoc} from 'firebase/firestore';
//firebase.initializeApp(config);
//const db=getFirestore();
const CreateAccountScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');


    const onContinuePressed = () => {
    const userData = collection(db, 'userData');
    const myDocumentData = {
          email: email,
          username: username,
          password: 'test'
    };
    const newDocRef = addDoc(userData, myDocumentData);
    if(email==='' || username===''){
        navigation.navigate('AppHome')
    }
    else
        navigation.navigate('CreateAccount2');
    };

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