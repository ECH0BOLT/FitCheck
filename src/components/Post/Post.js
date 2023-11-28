import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';
import Comments from '../../components/Comments/Comments';

const Post = ( { post } ) => {
    const navigation = useNavigation();
    const [isImageFilled, setImageFilled] = useState(true);

    const [commentsModalVisible, setCommentsModalVisible] = useState(false);
    const openCommentsModal = () => {
      setCommentsModalVisible(true);
    };

    const closeCommentsModal = () => {
      setCommentsModalVisible(false);
    };

    const updateLikes = async () => {
    try {
    //interchangable with line below, once merged with garrett code use this line: const title = post.postId;
        const title = post.postId;
        console.log('postID: ', title);

        const postDocRef = doc(firestore, 'posts', title);
        const postDocSnapshot = await getDoc(postDocRef);

        console.log('postDocSnapshot:', postDocSnapshot);

        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          console.log('postData:', postData);

          var likes = postData.likes;
          if(isImageFilled==true){
          likes++;
          await updateDoc(postDocRef, {
               likes: likes
               });
          }
          else{
          likes--;
          await updateDoc(postDocRef, {
               likes: likes
               });
          }

        } else {
          console.warn('Document does not exist');
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };

    const toggleImage = () => {
      setImageFilled(!isImageFilled);
    };

    if (!post) {
        return null; // Or return a placeholder, error message, or loading indicator
    }

    return (
//        <View style={styles.postContent}>
//
//          <View style={styles.postTop}>
//            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//                <Image source={require('../../assets/adam2.jpg')} style={styles.userIcon} />
//            </TouchableOpacity>
//            <View style={styles.userInfo}>
//              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//                <Text style={styles.handle}>@SandleMan</Text>
//              </TouchableOpacity>
//              <Text style={styles.time}>3 hours ago</Text>
//            </View>
//          </View>
//
//          <Image source={require('../../assets/adampost.jpg')} style={styles.post} />
//
//          <View style={styles.postBottom}>
//            <View style={styles.postButtons}>
//              <TouchableOpacity onPress={toggleImage}>
//                {isImageFilled ? (<Image source={require('../../assets/logo2unfilled.png')} style={styles.unlikedButton} />) : (<Image source={require('../../assets/logo2.png')} style={styles.likedButton} />)}
//              </TouchableOpacity>
//              <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('Comments')}>
//                <Image source={require('../../assets/comment.png')} style={styles.commentButton} />
//              </TouchableOpacity>
//            </View>
//            <View style={styles.checkCount}>
//              <Text style={styles.checkCount}>
//                <Text style={styles.boldText}>{'24 '}</Text>
//                checks
//              </Text>
//            </View>
//            <View style={styles.userCaption}>
//              <Text style={styles.userCaption}>
//                <Text style={styles.boldText}>{'SandleMan '}</Text>
//                This fit goes hard, feel free to ss.
//              </Text>
//            </View>
//            <TouchableOpacity style={styles.viewComments} onPress={() => navigation.navigate('Comments')}>
//              <Text style={styles.viewComments}>View 6 comments</Text>
//            </TouchableOpacity>
//          </View>
//
//        </View>

        <View style={styles.postContent}>

          <View style={styles.postTop}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../../assets/adam2.jpg')} style={styles.userIcon} />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.handle}>@{ post.user }</Text>
              </TouchableOpacity>
              <Text style={styles.time}>3 hours ago</Text>
            </View>
          </View>

          <Image source={{ uri: post.imageURL}} style={styles.post} />

          <View style={styles.postBottom}>
            <View style={styles.postButtons}>
              <TouchableOpacity onPress={() => {
                  updateLikes();
                  toggleImage();
              }}>
                {isImageFilled ? (<Image source={require('../../assets/logo2unfilled.png')} style={styles.unlikedButton} />) : (<Image source={require('../../assets/logo2.png')} style={styles.likedButton} />)}
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentButton} onPress={openCommentsModal}>
                <Image source={require('../../assets/comment.png')} style={styles.commentButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.checkCount}>
              <Text style={styles.checkCount}>
                <Text style={styles.boldText}>{ post.likes }</Text>
                  {' checks'}
              </Text>
            </View>
            <View style={styles.userCaption}>
              <Text style={styles.userCaption}>
                <Text style={styles.boldText}>{ post.user + ':'}</Text>
                { ' ' + post.caption }
              </Text>
            </View>
            <TouchableOpacity style={styles.viewComments} onPress={openCommentsModal}>
              <Text style={styles.viewComments}>View 6 comments</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={commentsModalVisible} transparent={true} onRequestClose={closeCommentsModal}>
            <View style={styles.commentsContainer}>
              <Comments/>
              <TouchableOpacity style={styles.closeContainer} onPress={closeCommentsModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

        </View>
    );
};

    const styles = StyleSheet.create({
      postContent: {
        marginBottom: 40,
      },
      post: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginBottom: -6,
      },
      postTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      userInfo: {},
      userIcon: {
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
        marginBottom: 3,
      },
      postBottom: {
      },
      postButtons:{
        flexDirection: 'row',
        top: 10,
      },
      unlikedButton: {
        height: 35,
        width: 35,
      },
      likedButton: {
        height: 35,
        width: 35,
      },
      commentButton: {
        height: 35,
        width: 35,
      },
      checkCount: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 5,
      },
      userCaption: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 5,
      },
      viewComments: {
        color: '#DCDCC8',
        fontSize: 15,
        top: 5,
      },
      boldText: {
        fontWeight: 'bold',
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
      commentsContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#142614',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      closeContainer: {
        borderRadius: 10,
        backgroundColor: '#3B593B',
        padding: 10,
        width: 100,
        elevation: 5,
        alignItems: 'center',
      },
      closeButton: {
        color: '#DCDCC8',
        fontSize: 16,
      },
    });

export default Post;