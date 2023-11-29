import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import FriendList from '../../components/FriendList/FriendList';
import SearchBar from '../../components/CustomInput2';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const FriendsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params?.email;
    console.log("FriendsScreen/Email: "+email);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
      <View style={styles.container}>
        <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
            <View style={styles.pageTop} >
              <Text style={styles.title}>Friends</Text>
              <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Settings',{email:email})}>
                <Image source={require('../../assets/SETTINGS.png')} style={styles.settings} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentHeader} >
              <Text style={styles.headerText}>
                <Text style={styles.boldText}>34</Text> Friends
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddFriends',{email:email})}>
                <Text style={styles.headerText2}>
                  {'Add Friends '}
                  <Text style={styles.boldText}>+</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pageContent} >
              <FriendList></FriendList>
            </View>
          </ScrollView>
        </LinearGradient>

          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AppHome',{email:email})}>
              <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('AppHome',{email:email})}>
              <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigation.navigate('Profile',{email:email})}>
              <Image source={require('../../assets/profile.png')} style={styles.navLogo} />
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
        paddingBottom: 30,
      },
      title: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
        paddingTop: 5,
      },
      settings: {
        position: 'absolute',
        height: 45,
        width: 45,
        left: 150,
      },
      contentHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      headerText: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
        paddingTop: 5,
      },
      headerText2: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
        paddingTop: 5,
        left: 50,
      },
      boldText: {
        fontWeight: 'bold',
      },
      pageContent: {
        width: '100%',
        height: 535,
        backgroundColor: '#3B593B',
        borderRadius: 10,
        elevation: 5,
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