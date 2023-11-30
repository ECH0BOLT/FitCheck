import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import {firestore} from '../../Firestore_Setup';
import {useNavigation,useRoute} from '@react-navigation/native';
import {getFirestore,arrayUnion,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc } from 'firebase/firestore';

const Comments = ({ post }) => {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(post.comments || []);
  const comments = post.comments;
  const route = useRoute();
  const email = route.params?.email;
  const postId = post.postId
  const [userData, setUserData] = useState({
        username: '',
        name: '',
        pfp:''
      });


const images = [
   require('../../assets/pfps/1.jpg'),
   require('../../assets/pfps/2.jpg'),
   require('../../assets/pfps/3.jpg'),
   require('../../assets/pfps/4.jpg'),
   require('../../assets/pfps/5.jpg'),
   require('../../assets/pfps/6.jpg'),
   require('../../assets/pfps/7.jpg'),
   require('../../assets/pfps/8.jpg'),
   require('../../assets/pfps/9.jpg'),
   require('../../assets/pfps/10.jpg'),
   require('../../assets/pfps/11.jpg'),
   require('../../assets/pfps/12.jpg')

];

const fetchUserData = async () => {
    try {
      const userRef = doc(getFirestore(), 'userData', email);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
        console.log(userData.pfp);
      } else {
        console.log('User document not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePostComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
//        console.log(postId);

        const postDocRef = doc(firestore, 'posts', postId);

        const commentData = { comment: newComment.trim(), userId: userData.username,pfp:userData.pfp};

        if (commentData.comment) {
          await updateDoc(postDocRef, {
            comments: arrayUnion(commentData),
          });

          setCommentsList([...commentsList, commentData]);
          setNewComment('');
          Keyboard.dismiss();
        } else {
          console.error('Invalid comment data:', commentData);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
  };

  const fetchComments = async () => {
      try {
        const postDocRef = doc(firestore, 'posts', postId);
        const docSnap = await getDoc(postDocRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          setCommentsList(postData.comments || []); // Set the initial comments list from Firestore
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    useEffect(() => {
      fetchComments(); // Fetch comments when the component mounts
      fetchUserData();
    }, [postId]);

  return (
    <View style={styles.container}>
      <ScrollView>
              <View style={styles.commentList}>
                {commentsList && commentsList.length > 0 ? (
                  commentsList.map((comment, index) => (
                    <View key={index} style={styles.commentItem}>
                      <Image source={( comment.pfp === undefined)?images[0]:images[comment.pfp-1]}  style={styles.commentIcon} />
                      <View>
                        <Text style={styles.commentUsername}>{comment.userId}</Text>
                        <Text style={styles.commentText}>{comment.comment}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No comments available</Text>
                )}
              </View>
            </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your comment..."
          placeholderTextColor="#182E18"
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
        />
        <TouchableOpacity
          style={[styles.postButton, { backgroundColor: newComment.trim() === '' ? '#243C24' : '#3B593B' }]}
          onPress={handlePostComment}
          disabled={newComment.trim() === ''}
        >
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
  },
  commentList: {
    flexDirection: 'column',
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  commentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentUsername: {
    color: '#8DBA8F',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 0,
  },
  commentText: {
    color: '#DCDCC8',
    fontSize: 19,
    paddingLeft: 0,
    paddingTop: 0,
    maxWidth: 300,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
    width: 360,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#DCDCC8',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    height: 45,
    fontSize: 16,
    elevation: 5,
  },
  postButton: {
    backgroundColor: '#3B593B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: '#DCDCC8', // Set the text color of the button
  },
});

export default Comments;
