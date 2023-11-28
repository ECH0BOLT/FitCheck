import React, {useState, Fragment, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, PermissionsAndroid } from 'react-native';
import Post from '../../components/Post/Post';
import CustomButtonPrimary from '../../components/CustomButton/CustomButtonPrimary';
import CustomButtonTertiary from '../../components/CustomButton/CustomButtonTertiary';
import CustomInput from '../../components/CustomInput';
import { useNavigation,useRoute, useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs'; // Import React Native FS for file handling
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc, getDocs} from 'firebase/firestore';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const AppHomeScreen = () => {

  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const email = route.params?.email;
  console.log("HOME/Email: " +email);
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && fetchPosts()
  },[isFocused]);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  useEffect(() => {
    requestCameraPermission();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(firestore, 'posts');
      const querySnapshot = await getDocs(postsCollection);

      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        // Map Firestore data to the structure expected by the Post component
        const post = {
          user: postData.user,
          imageURL: "data:image/png;base64,"+postData.imageURL,
          caption: postData.caption,
          likes: postData.likes,
          comments: postData.comments,
          postId: postData.postId,
          // Add other fields as needed (likes, comments, etc.)
        };
        fetchedPosts.push(post);
      });

      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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

    ImagePicker.launchCamera(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker by pressing back button');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
//        console.log(response.assets);
        var x = await RNFS.readFile(response.assets[0].originalPath,"base64");
//        console.log(x);
        setDoc(doc(firestore, 'test', 'placeholder'), {
          image: x
        });

        const selectedImageUri = response.assets[0].uri || null;

        if (selectedImageUri) {
          setImageUri(selectedImageUri);

          try {
            await saveImage(selectedImageUri);
          } catch (error) {
            console.error('Error saving image:', error);
          }
        } else {
          console.log('Invalid or undefined image URI');
        }
      } else {
      console.log('Invalid response format or no image selected');
      }
    });
  };



  const saveImage = async (imageUri) => {
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

      navigation.navigate('ImageViewScreen', { imagePath:imagePath,email:email });
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  };


  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'} >
          {/* Render fetched posts using the Post component */}
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </ScrollView>
      </LinearGradient>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Friends',{email:email})}>
          <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={launchCamera}>
          <Image source={require('../../assets/postButton.png')} style={styles.navPost} />
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
    paddingHorizontal: 16,
    paddingTop: 10,
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
    paddingVertical: 10,
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
  navPost: {
          height: 55,
          width: 55,
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