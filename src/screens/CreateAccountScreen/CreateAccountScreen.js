import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';

const CreateAccountScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const onContinuePressed = () => {
        navigation.navigate('CreateAccount2');
    };

    return (
            <View style={styles.page}>
              <Image source={require('../../icons/logo.png')} style={styles.logo} />
              <Text style={styles.appName}>fit check</Text>

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
        marginBottom: 65,
      },
    });

export default CreateAccountScreen