import React, {useState,useEffect} from 'react';
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
  var [username, setUsername] = useState('');
  var [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const { imagePath } = route.params;

const [userData, setUserData] = useState({
        username: '',
        name: ''
      });
  const [modalVisibleUsername, setModalVisibleUsername] = useState(false);
  const [modalVisibleName, setModalVisibleName] = useState(false);
  const [modalVisibleProfilePicture, setModalVisibleProfilePicture] = useState(false);

  const closeModal = async () => { 

  setModalVisibleUsername(false);
  setModalVisibleName(false);
  setModalVisibleProfilePicture(false);
  }

  const closeUsernameModal = async () => {
  if(username.length>15){
  console.warn("Username cannot be longer than 15 characters.")}
  else {
    updateDoc(doc(firestore, 'userData', email), {
          username: username
    });
    console.warn("Set to: "+username);
    setModalVisibleUsername(false);
  }}

  const closeNameModal = async () => {
  if(name.length>40){
  console.warn("Name cannot be longer than 40 characters.")}
  }
  else{
    updateDoc(doc(firestore, 'userData', email), {
          name: name
    });
    console.warn("Set to: "+name);
    setModalVisibleName(false);
  }}

  const closeProfilePictureModal = async () => {
    setModalVisibleProfilePicture(false);
  }

  const handleEditUsername = () => {
    setModalVisibleUsername(true);
  }

  const handleEditName = () => {
    setModalVisibleName(true);
  }

  const changeProfilePicture = () => {
    setModalVisibleProfilePicture(true);
  }


  const handleChangeProfilePicture = async () => {
        console.warn("todo");
  }

useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

     const fetchUserData = async () => {
        try {
          const userRef = doc(getFirestore(), 'userData', email);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);



            // You can set other state variables based on your user data
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };



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
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>@{userData.username}</Text>
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

              <TouchableOpacity onPress={closeUsernameModal} style={styles.closeButton}>
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

              <TouchableOpacity onPress={closeNameModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal visible={modalVisibleProfilePicture} animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Change Profile Picture</Text>

              <TouchableOpacity onPress={closeProfilePictureModal} style={styles.closeButton}>
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
