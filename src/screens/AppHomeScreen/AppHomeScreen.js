import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const AppHomeScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const onContinuePressed = () => {
        console.warn('log in');
    };

    return (
            <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']}>
              <View style={styles.page}>
                <View style={styles.feedContent}>
                  <View style={styles.postContent}>
                    <View style={styles.postTop}>
                      <Image source={require("../../assets/adam2.jpg")} style={styles.image} />
                      <View style={styles.userInfo}>
                        <Text style={styles.handle}>@SandleMan</Text>
                        <Text style={styles.time}>3 hours ago</Text>
                      </View>
                    </View>
                    <Image source={require("../../assets/adampost.jpg")} style={styles.post} />
                  </View>
                </View>
              </View>
            </LinearGradient>
      );
    };

    const styles = StyleSheet.create({
      page: {
        padding: 16, // Change the background color of the page here
      },
      feedContent: {
        backgroundColor: 'transparent',
        padding: 0,
        height: '100%',
      },
      postContent: {

      },
      post: {
        width: '100%',
        height: 550,
        borderRadius: 10,
      },
      postTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      userInfo: {

      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      handle: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10
      },
      time: {
        color: '#DCDCC8',
        fontSize: 16.5,
        paddingHorizontal: 10
      },
    });

export default AppHomeScreen