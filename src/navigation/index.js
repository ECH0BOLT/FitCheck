import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import CreateAccountScreen2 from '../screens/CreateAccountScreen2';
import AppHomeScreen from '../screens/AppHomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
                <Stack.Screen name="CreateAccount2" component={CreateAccountScreen2} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="AppHome" component={AppHomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;