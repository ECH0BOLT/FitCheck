import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const FriendsScreen = () => {

    const navigation = useNavigation();

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
          <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
              <View style={styles.pageTop} >
                <Text style={styles.title}>My Profile</Text>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => navigation.navigate('Settings')}>
                  <Image source={require('../../assets/SETTINGS.png')} style={styles.settings} />
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.username}>test</Text>
              </View>
            <View style={styles.friendsRectangle}></View>
            <View style={styles.memoriesRectangle}></View>
          </LinearGradient>

          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AppHome')}>
              <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AppHome')}>
              <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Friends')}>
              <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      page: {
        flex: 1,
        padding: 16,
      },
      pageTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      title: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
        paddingTop: 5,
      },
       username: {
        color: '#DCDCC8',
        fontSize: 25,
        top: 225,
      },
      userInfo: {
      justifyContent: 'center',
      alignItems: 'center',
      },
      settings: {
        position: 'fixed',
        height: 45,
        width: 45,
        left: 80,
      },
       friendsRectangle: {
          backgroundColor: '#3B593B',
          width: 315,
          height: 60,
          alignSelf: 'center',
          marginTop: 315,
          marginBottom: 40,
          borderRadius: 15
      },
      memoriesRectangle: {
          backgroundColor: '#3B593B',
          width: 360,
          height: 175,
          alignSelf: 'center',
          borderRadius: 30,
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#142614',
        paddingVertical: 15,
        elevation: 5,
      },
      navItem: {
        flex: 1,
        alignItems: 'center',
      },
      navText: {
        color: '#fff',
        fontSize: 16,
      },
      navLogo: {
        height: 45,
        width: 45,
      },
    });

    export default FriendsScreen;