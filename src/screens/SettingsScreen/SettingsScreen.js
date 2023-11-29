import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch, Modal, Clipboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../../Firestore_Setup';
import { doc, deleteDoc } from 'firebase/firestore';
import { TextInput } from 'react-native';

const SettingsScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  console.log("ProfileScreen/Email: " + email);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const handleDeleteAccount = async () => {
    setShowDeleteConfirmation(false);
    const usersRef = doc(firestore, `userData/${email}`);
    await deleteDoc(usersRef);
    navigation.navigate('Home');
  };

  const handleSupport = () => {
    setShowSupportModal(true);
  };

  const handlePrivacyToggle = () => {
    setIsPrivateProfile((prev) => !prev);
    // Implement privacy toggle functionality
  };

  const handleCopyLink = () => {
    Clipboard.setString('fitcheckproject@gmail.com');
    setShowSupportModal(false);
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleSavePassword = () => {
//    if(newPassword===changePassword){
//        const usersRef = doc(firestore, `userData/${email}`);
//
//        updateDoc(usersRef, {
//        password:newPassword
//
//        });
     console.log('Password saved');
     setShowChangePasswordModal(false); // Close the modal after saving the password
//    }
//    else{
//        console.warn('Passwords do not match.');
//    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile', { email: email })}>
          <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabItem} onPress={handleLogout}>
            <Text style={styles.tabText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setShowDeleteConfirmation(true)}>
            <Text style={styles.tabText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={handleSupport}>
            <Text style={styles.tabText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={handleChangePassword}>
            <Text style={styles.tabText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.privacyContainer}>
            <Text style={styles.tabText}>Privacy:</Text>
            <Text style={styles.privacyStatus}>{isPrivateProfile ? 'Private' : 'Public'}</Text>
            <Switch
              value={isPrivateProfile}
              onValueChange={handlePrivacyToggle}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isPrivateProfile ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDeleteConfirmation}
          onRequestClose={() => setShowDeleteConfirmation(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleDeleteAccount}>
                  <Text style={styles.modalButton}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDeleteConfirmation(false)}>
                  <Text style={styles.modalButton}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSupportModal}
          onRequestClose={() => setShowSupportModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Contact Support:</Text>
              <Text style={styles.modalEmail}>fitcheckproject@gmail.com</Text>
              <TouchableOpacity onPress={handleCopyLink}>
                <Text style={styles.copyLinkButton}>Copy Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showChangePasswordModal}
          onRequestClose={() => setShowChangePasswordModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Change Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password"
//                value={newPassword}
//                setValue={setNewPassword}
                placeholderTextColor="#DCDCC8"
                secureTextEntry
              />
              <TextInput
                style={styles.input}
//                value={confirmPassword}
//                setValue={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#DCDCC8"
                secureTextEntry
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowChangePasswordModal(false)}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSavePassword}>
                  <Text style={styles.modalButton}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  title: {
    color: '#DCDCC8',
    fontSize: 25,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  page: {
    padding: 16,
    flex: 1,
  },
  navItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
  },
  navLogo: {
    width: 50,
    height: 50,
    left: -5,
  },
  tabContainer: {
    marginTop: 20,
  },
  tabItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCC8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabText: {
    color: '#DCDCC8',
    fontSize: 18,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  privacyStatus: {
    color: '#DCDCC8',
    fontSize: 18,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#3B593B',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#DCDCC8',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: '#DCDCC8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalEmail: {
    color: '#DCDCC8',
    fontSize: 18,
    marginBottom: 20,
  },
  copyLinkButton: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#DCDCC8',
    borderWidth: 1,
    marginBottom: 10,
    color: '#DCDCC8',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SettingsScreen;
