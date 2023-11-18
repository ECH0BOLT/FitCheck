import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';

const CreateAccountScreen2 = () => {

    const navigation = useNavigation();

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const onSignUpPressed = () => {
    if(password1==password2){
        navigation.navigate('AppHome');
        }
        else navigation.navigate('Friends');
    };

    return (
            <View style={styles.page}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
              <Text style={styles.appName}>fit check</Text>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.navigate('CreateAccount')}>
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