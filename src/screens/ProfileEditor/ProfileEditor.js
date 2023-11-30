import React, {useState,useEffect, useReducer} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, Button, TextInput, Clipboard, } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {firestore} from '../../Firestore_Setup';
import {getFirestore,collection,addDoc, doc, Timestamp, updateDoc, setDoc,getDoc} from 'firebase/firestore';
import CustomInput from '../../components/CustomInput';
//import ChangeProfilePictureModal from './ChangeProfilePictureModal';
import CustomPFPButton from '../../components/CustomPFPButton';

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


const ProfileEditor = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email;
  console.log("ProfileEditor/Email: " +email);
  var [username, setUsername] = useState('');
  var [name, setName] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [profilePicture, setProfilePicture] = useState('');
  const [showPFPButton, setShowPFPButton] = useState(false);
  const { imagePath } = route.params;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [userData, setUserData] = useState({
    username: '',
    name: '',
    pfp:''
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
     userData.username=username;
      updateDoc(doc(firestore, 'userData', email), {
        username: username
      });
      console.warn("Set to: "+username);
      setModalVisibleUsername(false);
    }
  }

  const closeNameModal = async () => {
    if(name.length>40){
      console.warn("Name cannot be longer than 40 characters.")}
    else{
      userData.name=name;
      updateDoc(doc(firestore, 'userData', email), {
        name: name
      });
      console.warn("Set to: "+name);
      setModalVisibleName(false);
    }
  }

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
     setShowPFPButton(!showPFPButton);
  }

  const handleChangeProfilePicture = async () => {

     setModalVisibleProfilePicture(true);
  }
  const handleSelectNumber = (selectedNumber) => {
      console.log('Selected Number:', selectedNumber);
        setSelectedNumber(selectedNumber);
        userData.pfp=selectedNumber;
         updateDoc(doc(firestore, 'userData', email), {
                pfp:selectedNumber
              });
              console.log(userData.pfp);


        //forceUpdate();
      // Do something with the selected number, e.g., update state or perform an action
      // For example, you can update the profile picture based on the selected number
    };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile',{email:email})}>
            <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
          </TouchableOpacity>
          <Text style={styles.titleEP}>Edit Profile</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userInfo}>
          <Image source={(userData.pfp === null || userData.pfp === undefined)?images[0]:images[userData.pfp-1]} style={styles.profilePic} />
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
        <View style={styles.centeredContent}>
        {showPFPButton && (
          <CustomPFPButton
            isVisible={modalVisibleProfilePicture}
            onClose={() => setShowPFPButton(false)}
            onSave={handleChangeProfilePicture}
            onPress={handleSelectNumber}
          />
        )}
        </View>
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
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

 scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    width: '100%', // Ensure content takes up the full width of the screen
    alignItems: 'center',
  },

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
