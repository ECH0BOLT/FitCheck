import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const CSS = ({ route }) => {
  const { item, imagePath } = route.params;

      const email = route.params?.email;
      console.log("CSS/Email: " +email);

  console.log(imagePath)
  const navigation = useNavigation();


  // Define image sources based on the selected item
  let imageSource;
  if (item === 'Hat') {
    imageSource = require('../../assets/hat.png');
  } else if (item === 'Shirt') {
    imageSource = require('../../assets/shirt.png');
  } else if (item === 'Pants') {
    imageSource = require('../../assets/pants.png');
  } else if (item === 'Shoes') {
    imageSource = require('../../assets/shoes.png');
  }else if (item === 'Accessories') {
    imageSource = require('../../assets/moreOptions.png');
  }

  const [formData, setFormData] = useState({
    title: '',
    price: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
  <View style={styles.container}>
    <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
      <View style={styles.container2}>
        <Text style={styles.header}>Add Article</Text>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title"
            style={styles.textInput}
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.textInput}
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
          />
        </View>
      </View>
    </LinearGradient>
    <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ImageViewScreen', {imagePath, email:email} )}>
              <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ImageViewScreen', {imagePath,email:email)}>
              <Image source={require('../../assets/logo2unfilledjalf.png')} style={styles.navLogo} />
            </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}></TouchableOpacity>
          </View>
  </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 16,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  container2: {
  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DCDCC8',
    textDecorationLine: 'underline',
  },
  image: {
    width: 275,
    height: 200,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  textInput: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    backgroundColor: '#DCDCC8',
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

export default CSS;
