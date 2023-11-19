import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, TextInput, Clipboard, } from 'react-native';
import ProfileFriends from '../../components/ProfileFriends/ProfileFriends';
import ProfileMemories from '../../components/ProfileMemories/ProfileMemories';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [profileUrl, setProfileUrl] = useState(''); // State to store the profile URL

    const handleShareButton = () => {
        setModalVisible(true);
        // You can set the profile URL here or fetch it from an API
        // For now, let's set it to a dummy value
        setProfileUrl('https://example.com/user123');
    };
    const handleCopyLink = () => {
        Clipboard.setString(profileUrl);
        // provide feedback to the user that the link is copied
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
          <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>

            <View style={styles.pageTop} >
              <Text style={styles.title}>My Profile</Text>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShareButton}>
                <Image source={require('../../assets/share.png')} style={styles.settings} />
              </TouchableOpacity>
               {/* Modal used for sharing the users account URL */}
                      <Modal animationType="fade" transparent={true} visible={modalVisible}>
                        <View style={styles.modalContainer}>
                          <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                              <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Share Profile Link</Text>
                            <TextInput
                              style={styles.profileUrlInput}
                              value={profileUrl}
                              onChangeText={(text) => setProfileUrl(text)}
                              editable={false}
                            />
                            <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
                              <Text style={styles.copyButtonText}>Copy Link</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../../assets/SETTINGS.png')} style={styles.settings} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editProfileContainer}
                onPress={() => navigation.navigate('ProfileEditor')}>
                <Text style={styles.editProfile}>edit profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Image source={require('../../assets/adam2.jpg')} style={styles.profilePic} />
              <Text style={styles.name}>Adam Sandler</Text>
              <Text style={styles.username}>@SandleMan</Text>
            </View>

            <Text style={styles.boxTitle}>
                <Text style={styles.boldText}>{'34 '}</Text>
                Friends
             </Text>
            <View style={styles.friendsRectangle}>
                <ProfileFriends/>
            </View>

            <Text style={styles.boxTitle2}>Memories</Text>
            <View style={styles.memoriesRectangle}>
                <ProfileMemories/>
            </View>

          </LinearGradient>

          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
              <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome')}>
              <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Friends')}>
              <Image source={require('../../assets/friends.png')} style={styles.navLogo} />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      page: {
        flex: 1,
        padding: 16,
      },
      pageTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      title: {
        color: '#DCDCC8',
        fontSize: 25,
        paddingHorizontal: 10,
        paddingTop: 5,
      },
      editProfileContainer: {
        position: 'absolute',
        left: 10,
        top: 50,
      },
      editProfile: {
        color: '#DCDCC8',
        fontSize: 20,
        textDecorationLine: 'underline',
      },
      userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
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
      },
      settings: {
        position: 'absolute',
        height: 45,
        width: 45,
        left: 165,
      },
      boxTitle: {
        color: '#DCDCC8',
        fontSize: 20,
        top: 60,
        left: 25,
      },
      boldText: {
        fontWeight: 'bold',
      },
      boxTitle2: {
        color: '#DCDCC8',
        fontSize: 20,
      },
      friendsRectangle: {
        backgroundColor: '#3B593B',
        width: 315,
        height: 60,
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 5,
        borderRadius: 13,
      },
      memoriesRectangle: {
        backgroundColor: '#3B593B',
        width: 380,
        height: 205,
        alignSelf: 'center',
        borderRadius: 10,
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#142614',
        paddingVertical: 15,
        elevation: 5,
      },
      shareButton: {
        right: 60,
        position: 'fixed',
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
       // Modal styles
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modalContent: {
          backgroundColor: '#3B593B',
          padding: 20,
          borderRadius: 10,
          width: '80%',
        },
        modalTitle: {
          color: '#DCDCC8',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 10,
        },
        profileUrlInput: {
          backgroundColor: '#DCDCC8',
          color: '#3B593B',
          fontSize: 16,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        },
        copyButton: {
          backgroundColor: '#DCDCC8',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
        },
        copyButtonText: {
          color: '#3B593B',
          fontSize: 16,
        },
        closeButton: {
          position: 'absolute',
          top: 10,
          right: 10,
        },
        closeButtonText: {
          color: '#DCDCC8',
          fontSize: 18,
        },
    });

    export default ProfileScreen;