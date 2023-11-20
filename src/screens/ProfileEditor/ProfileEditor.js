
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, TextInput, Clipboard, } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';

const ProfileEditor = () => {
  // Add your profile editing logic here
   const route = useRoute();
   const navigation = useNavigation();
      const email = route.params?.email;
      console.log("ProfileEditor/Email: " +email);
    const [newUsername, setUsername] = useState('');
    const [newName, setName] = useState('');
  const { imagePath } = route.params;

  const handleEditUsername = () => {
  //Add a textbox popup that they can type in that does setValue={setUsername}
  //Add onPress={handleHandleEditUsername}
  }
  const handleEditName = () => {
  //Add a textbox popup that they can type in that does setValue={setName}
  //Add onPress={handleHandleEditName}
  }

  const handleEditProfilePicture = () => {
  //todo
  }

  const handleHandleEditUsername = async () => {

  var newUsername = "newUsername"
  const usersRef = doc(firestore,`userData/${email}`);
  var p = await getDoc(usersRef);
  var info = p.data();
  name=info.name;
  username=newUsername;
  password=info.password;
  console.warn(info);
  setDoc(doc(firestore, 'userData', email), {
              name: name,
              username: username,
              password: password
            });
  console.warn("Set to: "+newUsername);
  }

  const handleHandleEditName = async () => {
  var newName = "newName"
    const usersRef = doc(firestore,`userData/${email}`);
    var p = await getDoc(usersRef);
    var info = p.data();
    name=newName;
    username=info.username;
    password=info.password;
    console.warn(info);
    setDoc(doc(firestore, 'userData', email), {
                name: name,
                username: username,
                password: password
              });
    console.warn("Set to: "+newUsername);
    }

  const changeProfilePicture = async () => {
        console.warn("todo");
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
      <TouchableOpacity style={styles.editProfileItem} onPress={handleEditUsername}>
        <Text style={styles.editProfileLabel}>Change Username</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileItem} onPress={handleEditName}>
        <Text style={styles.editProfileLabel}>Change Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileItem} onPress={changeProfilePicture}>
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
