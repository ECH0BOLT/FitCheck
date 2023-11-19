import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const ImageViewScreen = ({ route }) => {
  const { imagePath } = route.params; // Get the imagePath from navigation params
      const navigation = useNavigation();


  return (
        <View style={styles.container}>
    <View style={styles.container}>
      <Image source={{ uri: `file://${imagePath}` }} style={styles.image} />
    </View>
    <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
                  <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
                  <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Friends')}>
                  <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
                </TouchableOpacity>
              </View>
              </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  bottomNav: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#142614',
          paddingVertical: 15,
          elevation: 5,
        },
        shareButton: {
          right: 60,
          position: 'fixed',
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

export default ImageViewScreen;
