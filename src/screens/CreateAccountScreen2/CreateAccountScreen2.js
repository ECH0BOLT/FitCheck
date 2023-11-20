import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc} from 'firebase/firestore';
const CreateAccountScreen2 = () => {
    const route = useRoute();
    const email = route.params?.email;
    const username = route.params?.username;
    const navigation = useNavigation();

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const onSignUpPressed = () => {

    if(password1===password2&&password1.trim() !== ""){
    setDoc(doc(firestore, 'userData', email), {
            username: username,
            password: password1
          });
        navigation.navigate('AppHome',{email:email});
    }
    else console.warn("Your password does not meet normal standards");
        //else navigation.navigate('Friends', {email:email});
    };

    return (
            <View style={styles.page}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
              <Text style={styles.appName}>fit check</Text>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.navigate('CreateAccount', {email:email})}>
                <Image source={require('../../assets/arrow2.png')} style={styles.back} />
              </TouchableOpacity>
              <CustomInput placeholder="password" value={password1} setValue={setPassword1} />

              <CustomInput placeholder="confirm password" value={password2} setValue={setPassword2} />
              <CustomButtonPrimary text="sign up" onPress={onSignUpPressed}/>
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

export default CreateAccountScreen2