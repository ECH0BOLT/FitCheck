import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const onLoginPressed = () => {
        navigation.navigate('AppHome');
    };

    return (
            <View style={styles.page}>
              <Image source={require('../../icons/logo.png')} style={styles.logo} />
              <Text style={styles.appName}>fit check</Text>

              <CustomInput placeholder="username" value={email} setValue={setEmail} />
              <CustomInput placeholder="password" value={username} setValue={setUsername} />
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
        marginBottom: 65,
      },
    });

export default LoginScreen