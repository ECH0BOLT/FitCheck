import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import ProfileFriends from '../../components/ProfileFriends/ProfileFriends';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {

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
              <Image source={require('../../assets/adam2.jpg')} style={styles.profilePic} />
              <Text style={styles.name}>Adam Sandler</Text>
              <Text style={styles.username}>@SandleMan</Text>
            </View>
            <Text style={styles.boxTitle}>Friends</Text>
            <View style={styles.friendsRectangle}>
                <ProfileFriends/>
                <TouchableOpacity
                  style={styles.navItem}
                  onPress={() => navigation.navigate('Friends')}>
                  <Text style={styles.addFriendButton}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.boxTitle2}>Memories</Text>
            <View style={styles.memoriesRectangle}>
            </View>
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
      userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      profilePic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        top: 40,
      },
      name: {
        color: '#DCDCC8',
        fontSize: 30,
        top: 50,
      },
      username: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 55,
      },
      settings: {
        position: 'absolute',
        height: 45,
        width: 45,
        left: 165,
      },
      boxTitle: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 60,
        left: 25,
      },
      boxTitle2: {
        color: '#DCDCC8',
        fontSize: 20,
      },
      friendsRectangle: {
        backgroundColor: '#3B593B',
        width: 315,
        height: 60,
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 5,
        borderRadius: 13,
      },
      addFriendButton: {
        color: '#DCDCC8',
        fontSize: 20,
      },
      memoriesRectangle: {
        backgroundColor: '#3B593B',
        width: 360,
        height: 175,
        alignSelf: 'center',
        borderRadius: 25,
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
        width: 55,
      },
    });

    export default ProfileScreen;