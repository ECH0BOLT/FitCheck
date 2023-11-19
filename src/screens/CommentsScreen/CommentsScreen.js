import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Comments from '../../components/Comments/Comments';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const CommentsScreen = () => {

    const navigation = useNavigation();

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
          <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
                  <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
                </TouchableOpacity>
                <Text style={styles.commentHeader}>Comments</Text>
            </View>
            <Comments/>
          </LinearGradient>
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
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      },
      commentHeader: {
        textAlign: 'center',
        fontSize: 30,
        color: '#DCDCC8',
        flex: 1,
        marginRight: 45,
        textDecorationLine: 'underline',
      },
      navItem: {
      },
      navLogo: {
        height: 45,
        width: 45,
      },
    });

    export default CommentsScreen;