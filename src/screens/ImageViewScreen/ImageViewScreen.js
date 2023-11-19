import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const ImageViewScreen = ({ route }) => {
  const { imagePath } = route.params;
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const translateY = new Animated.Value(0);

  const toggleMenu = () => {
    Animated.timing(translateY, {
      toValue: menuVisible ? Dimensions.get('window').height : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const menuStyle = {
    transform: [
      {
        translateY: translateY,
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

      <Animated.View style={[styles.menuContainer, menuStyle]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 1 pressed')}>
          {/* Add content for button 1 */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 2 pressed')}>
          {/* Add content for button 2 */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 3 pressed')}>
          {/* Add content for button 1 */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Button 4 pressed')}>
          {/* Add content for button 2 */}
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
          <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
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
    bottom: 90,
    right: 10,
    zIndex: 0,
    backgroundColor: '#142614',
    width: 75,
    height: 300,
    borderRadius: 40,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
