import React, { useState, useEffect} from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';

const PostConfirmationScreen = ({ route }) => {

  const email = route.params?.email;
  console.log("ImageViewS/Email: " +email);
  const navigation = useNavigation();
  const [imageData, setImageData] = useState('');
  const imagePath = route.params?.imagePath;
  const [caption, setCaption] = useState('');

  var likes=0;
  var imageURL = 'https://kobebryant.com';

  const handlePost = async () => {
    const imageRef = doc(getFirestore(), 'test','placeholder');
    const imageDoc = await getDoc(imageRef);
    const imageData = imageDoc.data();
    imageURL = imageData.image;

    const userRef = doc(getFirestore(), 'userData', email);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const username = userData.username;
    const postId = Math.floor(Math.random() * 100000000).toString();
    const pfp = userData.pfp;

    setDoc(doc(firestore, 'posts', postId), {
      postId: postId,
      caption: caption,
      imageURL: imageURL,
      likes: likes,
      user: username,
      pfp:pfp,
      comments: [],
    });
//    console.warn(caption);
    navigation.navigate('AppHome',{email:email});
  }

  useEffect( () => {
  const postRef = doc(firestore,`test/placeholder`);
  getDoc(postRef).then(p => setImageData("data:image/png;base64,"+p.data().image));
  },[])

  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
        <View style={styles.imageContainer}>
          {
          imageData &&
          <Image source={{ uri: imageData }} style={styles.image} />
          }
        </View>
        <View style={styles.captionContainer}>
          <CustomInput placeholder="Enter a caption" value={caption} setValue={setCaption}/>
        </View>
      </LinearGradient>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ImageViewScreen',{email:email})}>
          <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handlePost}>
          <Image source={require('../../assets/logo2unfilledfull.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}></TouchableOpacity>
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
    paddingTop: 50,
  },
  captionContainer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: Dimensions.get('window').height - 400,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
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

export default PostConfirmationScreen;
