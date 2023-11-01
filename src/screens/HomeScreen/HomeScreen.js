import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';

const onCreateAccountPressed = () => {
    console.warn("Create Account");
}

const onLogInPressed = () => {
    console.warn("Log In");
}

const HomeScreen = () => {
  return (
        <View style={styles.page}>
          <Image source={require('../../icons/logo.png')} style={styles.logo} />
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

export default HomeScreen;