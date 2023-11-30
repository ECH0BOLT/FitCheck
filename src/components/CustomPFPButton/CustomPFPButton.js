import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const images = [
   require('../../assets/pfps/1.jpg'),
   require('../../assets/pfps/2.jpg'),
   require('../../assets/pfps/3.jpg'),
  require('../../assets/pfps/4.jpg'),
   require('../../assets/pfps/5.jpg'),
   require('../../assets/pfps/6.jpg'),
  require('../../assets/pfps/7.jpg'),
   require('../../assets/pfps/8.jpg'),
   require('../../assets/pfps/9.jpg')
];

const CustomPFPButton = ({ onPress }) => {
  const handlePress = (index) => {
    onPress(index + 1); // Return a number from 1 to 8
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handlePress(index)}
        >
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default CustomPFPButton;