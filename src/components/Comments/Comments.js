import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity } from 'react-native';

const generateFakeComments = (count) => {
  const comments = [];
  const commentVariations = ['Nice outfit!', 'Love the style.', 'Great look!', 'Did you get those clothes out of a dumpster? Garbage.', 'Awesome fashion sense!', 'Stylish!', 'Fantastic outfit choice.'];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * commentVariations.length);
    const randomComment = commentVariations[randomIndex];

    comments.push({
      id: i,
      username: `StinkyKitten${i}`,
      comment: randomComment,
      thumbnail: `https://placekitten.com/50/50?image=${i + 1}`, // Replace with a placeholder image URL
    });
  }
  return comments;
};

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setComments(generateFakeComments(5)); // Adjust the count as needed
  }, []);

  const handlePostComment = () => {

    if (newComment.trim() === '') {
      return;
    }

    const newComments = [
      ...comments,
      {
        id: comments.length,
        username: 'RizzGod', // Replace with the actual username or user ID
        comment: newComment,
        thumbnail: 'https://placekitten.com/50/50?image=0', // Replace with the actual user thumbnail
      },
    ];

    setComments(newComments);
    setNewComment('');

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.commentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
        <View style={styles.commentList}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image source={{ uri: comment.thumbnail }} style={styles.commentIcon} />
              <View>
                <Text style={styles.commentUsername}>{`${comment.username}`}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
              </View>
            </View>
          ))}
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
    backgroundColor: '#3B593B', // Set the background color of the button
    paddingVertical: 10, // Adjust the vertical padding
    paddingHorizontal: 20, // Adjust the horizontal padding
    borderRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: '#DCDCC8', // Set the text color of the button
  },
});

export default Comments;
