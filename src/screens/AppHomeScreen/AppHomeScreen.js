import React, { useState, Fragment, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, Button, Dimensions, PermissionsAndroid, Platform, } from 'react-native';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs'; // Import React Native FS for file handling
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const AppHomeScreen = () => {

    const navigation = useNavigation();

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

//    const [imageUri, setImageUri] = useState('');
//    useEffect(() => {
//      requestCameraPermission();
//    }, []);
//
//      const requestCameraPermission = async () => {
//        try {
//          if (Platform.OS === 'android') {
//            const granted = await PermissionsAndroid.request(
//              PermissionsAndroid.PERMISSIONS.CAMERA,
//              {
//                title: 'App Camera Permission',
//                message: 'App needs access to your camera',
//                buttonNeutral: 'Ask Me Later',
//                buttonNegative: 'Cancel',
//                buttonPositive: 'OK',
//              }
//            );
//            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//              console.log('Camera permission granted');
//            } else {
//              console.log('Camera permission denied');
//            }
//          }
//        } catch (err) {
//          console.warn(err);
//        }
//      };
//
//      const launchCamera = () => {
//        const options = {
//          storageOptions: {
//            skipBackup: true,
//            path: 'images',
//          },
//        };
//        ImagePicker.launchCamera(options, (response) => {
//          console.log('Response = ', response);
//
//          if (response.didCancel) {
//            console.log('User cancelled image picker by pressing back button');
//          } else if (response.error) {
//            console.log('ImagePicker Error: ', response.error);
//          } else if (response.customButton) {
//            console.log('User selected custom button: ', response.customButton);
//            alert(response.customButton);
//          } else {
//            setImageUri(response.uri);
//          }
//        });
//      };

    return (
        <View style={styles.container}>
          <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>

              <View style={styles.postContent}>
                <View style={styles.postTop}>
                  <Image source={require('../../assets/adam2.jpg')} style={styles.image} />
                  <View style={styles.userInfo}>
                    <Text style={styles.handle}>@SandleMan</Text>
                    <Text style={styles.time}>3 hours ago</Text>
                  </View>
                </View>
                <Image source={require('../../assets/adampost.jpg')} style={styles.post} />
                <View style={styles.postBottom}>
                    <Text style={styles.handle}>Words here</Text>
                </View>
              </View>

              <View style={styles.postContent}>
                <View style={styles.postTop}>
                  <Image source={require('../../assets/adam2.jpg')} style={styles.image} />
                  <View style={styles.userInfo}>
                    <Text style={styles.handle}>@SandleMan</Text>
                    <Text style={styles.time}>3 hours ago</Text>
                  </View>
                </View>
                <Image source={require('../../assets/adampost.jpg')} style={styles.post} />
              </View>

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
        padding: 16,
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