import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import {useNavigation,useRoute} from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation();

  const onCreateAccountPressed = () => {
      navigation.navigate('CreateAccount');
  }

  const onLogInPressed = () => {
      navigation.navigate('Login');
  }

  return (
    <View style={styles.page}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>fit check</Text>
      <CustomButtonPrimary text="create an account" onPress={onCreateAccountPressed} />
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: '#4A4A4A' }}>Already have an account? </Text>
        <CustomButtonTertiary text="Log in" onPress={onLogInPressed}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#DCF0C8',
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

export default HomeScreen;