import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import {firestore} from '../../Firestore_Setup';
import { arrayUnion,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc } from 'firebase/firestore';

const Comments = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(comments || []);

  const handlePostComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    try {
        console.log(postId);
        const postDocRef = doc(firestore, 'posts', postId);
        const commentData = { comment: newComment.trim() };

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.commentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
        <View style={styles.commentList}>
          {comments && comments.length > 0 ? (
            comments.map((comments, index) => (
              <View key={index} style={styles.commentItem}>
                <Image source={{ uri: comments.thumbnail }} style={styles.commentIcon} />
                <View>
                  <Text style={styles.commentUsername}>{comments.userId}</Text>
                  <Text style={styles.commentText}>{comments.comment}</Text>
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
