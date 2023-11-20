import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, getDoc} from 'firebase/firestore';
import { useRoute } from "@react-navigation/native";

const LoginScreen = () => {
    const email = route.params?.email;
  const { imagePath } = route.params;
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPressed = async () => {
    const usersRef = doc(firestore,`userData/${email}`);
    var p = await getDoc(usersRef)
    var testPass = p.data();

    if (testPass.password==password) {
    navigation.navigate('AppHome',{email:email});
    } else {
    console.warn('No user found with that email and password combination.');
    }

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
              <CustomInput placeholder="email" value={email} setValue={setEmail} />
              <CustomInput placeholder="password" value={password} setValue={setPassword} />
              <CustomButtonPrimary text="log in" onPress={onLoginPressed}/>
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

export default LoginScreen