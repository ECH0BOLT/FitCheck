import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);

  const handleLogout = () => {
    // Implement logout functionality
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
  };

  const handleSupport = () => {
    // Implement support functionality
  };

  const handlePrivacyToggle = () => {
    setIsPrivateProfile((prev) => !prev);
    // Implement privacy toggle functionality
  };

  return (
    <View style={styles.container}>
      <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabItem} onPress={handleLogout}>
            <Text style={styles.tabText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={handleDeleteAccount}>
            <Text style={styles.tabText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={handleSupport}>
            <Text style={styles.tabText}>Support</Text>
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
});


export default SettingsScreen;

