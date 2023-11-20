import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, Button, TextInput, Clipboard, } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';
import CustomInput from '../../components/CustomInput';

const ProfileEditor = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email;
  console.log("ProfileEditor/Email: " +email);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const { imagePath } = route.params;

  const [modalVisibleUsername, setModalVisibleUsername] = useState(false);
  const [modalVisibleName, setModalVisibleName] = useState(false);
  const [modalVisibleProfilePicture, setModalVisibleProfilePicture] = useState(false);


  const closeModal = () => {
    setModalVisibleUsername(false);
    setModalVisibleName(false);
    setModalVisibleProfilePicture(false);
  };

  const handleEditUsername = () => {
    setModalVisibleUsername(true);
  }

  const handleEditName = () => {
    setModalVisibleName(true);
  }

  const changeProfilePicture = () => {
    setModalVisibleProfilePicture(true);
  }

  const handleHandleEditUsername = async () => {
    var newUsername = "hi"
    const usersRef = doc(firestore,`userData/${email}`);
    var p = await getDoc(usersRef);
    var info = p.data();
    name=info.name;
    username=newUsername;
    password=info.password;
    console.warn(info);
    setDoc(doc(firestore, 'userData', email), {
      name: name,
      username: username
    });
    console.warn("Set to: "+newUsername);
  }

  const handleHandleEditName = async () => {
      console.warn("todo");
  }

  const handleChangeProfilePicture = async () => {
        console.warn("todo");
  }

  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile',{email:email})}>
            <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
          </TouchableOpacity>
          <Text style={styles.titleEP}>Edit Profile</Text>
        </View>

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

        <Modal visible={modalVisibleUsername} animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Change Username</Text>

              <CustomInput placeholder="New Username" value={username} setValue={setUsername}/>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal visible={modalVisibleName} animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Change Name</Text>

              <CustomInput placeholder="New Name" value={name} setValue={setName}/>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal visible={modalVisibleProfilePicture} animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Change Profile Picture</Text>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#3B593B',
    padding: 15,
    width: 350,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#182E18',
    width: 100,
    borderRadius: 25,
    padding: 5,
  },
  buttonText: {
    color: '#DCDCC8',
    fontSize: 16,
    textAlign: 'center',
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
