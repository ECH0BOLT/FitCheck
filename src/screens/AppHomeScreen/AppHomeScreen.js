import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Post from '../../components/Post/Post';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const AppHomeScreen = () => {

    const navigation = useNavigation();

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
          <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>

              <Post/>
              <Post/>

            </ScrollView>
          </LinearGradient>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Friends')}>
              <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AppHome')}>
              <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../../assets/profile.png')} style={styles.navLogo} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate('CreatePost')}>
              <Image source={require('../../assets/postButton.png')} style={styles.postLogo} />
            </TouchableOpacity>
        </View>
    );
};

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      page: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
      },
      feedContent: {
        backgroundColor: 'transparent',
        padding: 0,
        flex: 1,
      },
      postContent: {
        marginBottom: 50,
      },
      post: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginBottom: 20,
      },
      postTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      postBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      userInfo: {},
      image: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      handle: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
      },
      time: {
        color: '#DCDCC8',
        fontSize: 16.5,
        paddingHorizontal: 10,
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
      postLogo: {
        height: 80,
        width: 80,
      },
      postButton: {
        height: 0,
        width: 0,
        bottom: 160,
        left: 300,
      },
    });

    export default AppHomeScreen;