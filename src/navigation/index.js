import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import CreateAccountScreen2 from '../screens/CreateAccountScreen2';
import AppHomeScreen from '../screens/AppHomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import ProfileEditor from '../screens/ProfileEditor';

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
                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="Comments" component={CommentsScreen} />
                <Stack.Screen name="ProfileEditor" component={ProfileEditor} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;