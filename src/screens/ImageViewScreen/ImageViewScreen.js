import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useRoute } from "@react-navigation/native";
const ImageViewScreen = ({ route }) => {
  const email = route.params?.email;
  const { imagePath } = route.params;
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnimation = new Animated.Value(0);

  const toggleMenu = () => {
    const newValue = menuVisible ? 0 : 1;
    setMenuVisible(!menuVisible);

    Animated.timing(slideAnimation, {
      toValue: newValue,
      duration: 1000, // Adjust the duration as needed (in milliseconds)
      useNativeDriver: false,
    }).start();
  };

  const menuStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [120, 0], // Adjust the height of the sliding menu as needed
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `file://${imagePath}` }} style={styles.image} />
        <TouchableOpacity style={styles.hangerContainer} onPress={toggleMenu}>
          <View style={styles.circleContainer}>
            <Image source={require('../../assets/hanger.png')} style={styles.hangerIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Sliding Menu */}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, menuStyle]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 1 pressed')}>
            <Image source={require('../../assets/hat.png')} style={styles.hat} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 2 pressed')}>
            <Image source={require('../../assets/shirt.png')} style={styles.shirt} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 3 pressed')}>
            <Image source={require('../../assets/pants.png')} style={styles.pants} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 4 pressed')}>
            <Image source={require('../../assets/shoes.png')} style={styles.shoes} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 5 pressed')}>
            <Image source={require('../../assets/moreOptions.png')} style={styles.more} />
          </TouchableOpacity>
        </Animated.View>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome', {email:email})}>
          <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome',{email:email})}>
          <Image source={require('../../assets/logo2unfilled.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}></TouchableOpacity>
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
  imageContainer: {
    position: 'relative',
    height: Dimensions.get('window').height - 100,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  hangerContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      zIndex: 1,
    },
    circleContainer: {
      width: 75,
      height: 75,
      borderRadius: 40,
      backgroundColor: '#DCF0C8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    hangerIcon: {
      width: 55,
      height: 40,
    },
    menuContainer: {
      position: 'absolute',
      bottom: 210,
      right: 10,
      zIndex: 0,
      backgroundColor: '#142614',
      width: 75,
      height: 325,
      borderRadius: 40,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
    },
    menuItem: {
      paddingVertical: 5,
    },
    navLogo: {
    height: 45,
    width: 45,
  },
  hat: {
    height: 30,
    width: 45,
  },
  shirt: {
    height: 45,
    width: 45,
  },
  pants: {
    height: 45,
    width: 30,
  },
  shoes: {
    height: 35,
    width: 45,
  },
  more: {
    height: 30,
    width: 45,
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

export default ImageViewScreen;
