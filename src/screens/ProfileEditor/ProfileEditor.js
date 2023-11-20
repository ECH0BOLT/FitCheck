
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, TextInput, Clipboard, } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileEditor = () => {
  // Add your profile editing logic here
   const route = useRoute();
   const navigation = useNavigation();
      const email = route.params?.email;
      console.log("ProfileEditor/Email: " +email);

  const { imagePath } = route.params;

  const handleEditUsername = () => {

  }
  return (
    <View style={styles.container}>
    <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
      {/* Add your profile editing components here */}
      <View style={styles.header}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile',{email:email})}>
              <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
          </TouchableOpacity>
          <Text style={styles.titleEP}>Edit Profile</Text>
      </View>
      {/* Example components for editing username, display name, and profile picture */}
      <View style={styles.userInfo}>
        <Image source={require('../../assets/adam2.jpg')} style={styles.profilePic} />
        <Text style={styles.name}>Adam Sandler</Text>
        <Text style={styles.username}>@SandleMan</Text>
      </View>
      <TouchableOpacity style={styles.editProfileItem}>
        <Text style={styles.editProfileLabel}>Change Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileItem}>
        <Text style={styles.editProfileLabel}>Change Display Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileItem}>
        <Text style={styles.editProfileLabel}>Change Profile Picture</Text>
      </TouchableOpacity>
       </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  editProfileItem: {
    backgroundColor: '#3B593B',
    width: 250,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  editProfileLabel: {
    color: '#DCDCC8',
    fontSize: 16,
  },
  profilePic: {
    width: 170,
    height: 170,
    borderRadius: 100,
    top: 40,
  },
  name: {
    color: '#DCDCC8',
    fontSize: 30,
    top: 45,
  },
  username: {
    color: '#DCDCC8',
    fontSize: 20,
    top: 45,
    marginBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleEP: {
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

export default ProfileEditor;
