import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Post = () => {

    const navigation = useNavigation();
    const [isImageFilled, setImageFilled] = useState(true);

    const toggleImage = () => {
      setImageFilled(!isImageFilled);
    };

    return (
        <View style={styles.postContent}>

          <View style={styles.postTop}>
            <Image source={require('../../assets/adam2.jpg')} style={styles.userIcon} />
            <View style={styles.userInfo}>
              <Text style={styles.handle}>@SandleMan</Text>
              <Text style={styles.time}>3 hours ago</Text>
            </View>
          </View>

          <Image source={require('../../assets/adampost.jpg')} style={styles.post} />

          <View style={styles.postBottom}>
            <View style={styles.postButtons}>
              <TouchableOpacity onPress={toggleImage}>
                {isImageFilled ? (<Image source={require('../../assets/logo2unfilled.png')} style={styles.unlikedButton} />) : (<Image source={require('../../assets/logo2.png')} style={styles.likedButton} />)}
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('Comments')}>
                <Image source={require('../../assets/comment.png')} style={styles.commentButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.checkCount}>
              <Text style={styles.checkCount}>
                <Text style={styles.boldText}>{'24 '}</Text>
                checks
              </Text>
            </View>
            <View style={styles.userCaption}>
              <Text style={styles.userCaption}>
                <Text style={styles.boldText}>{'SandleMan '}</Text>
                This fit goes hard, feel free to ss.
              </Text>
            </View>
            <TouchableOpacity style={styles.viewComments} onPress={() => navigation.navigate('Comments')}>
              <Text style={styles.viewComments}>View 6 comments</Text>
            </TouchableOpacity>
          </View>

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
    });

export default Post;