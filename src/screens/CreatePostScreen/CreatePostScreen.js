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
import { useRoute } from "@react-navigation/native";
const CreatePostScreen = () => {
    const route = useRoute();
    const email = route.params?.email;
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker by pressing back button');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri || null;

        if (selectedImageUri) {
          setImageUri(selectedImageUri);
        } else {
          console.log('Invalid or undefined image URI');
        }
      } else {
        console.log('Invalid response format or no image selected');
      }
    });
  };


  const saveImage = async () => {
    try {
      if (!imageUri || !imageUri.startsWith('file://')) {
        console.log('Invalid or undefined image URI');
        return;
      }

      const imageName = 'liked_image.jpg';
      const imagePath = `${RNFS.DocumentDirectoryPath}/${imageName}`;

      // Use moveFile method of RNFS to handle file operations
      await RNFS.moveFile(imageUri, imagePath);
      console.log('Image saved at:', imagePath);
//      navigation.navigate('ImageViewScreen', { imagePath, email:email });
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={launchCamera} style={styles.button}>
          <Text style={styles.buttonText}>Launch Camera</Text>
        </TouchableOpacity>
        {imageUri !== '' && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity onPress={saveImage} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default CreatePostScreen;