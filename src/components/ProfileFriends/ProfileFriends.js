import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const URL = "https://randomuser.me/api/?results=4";

const ProfileFriends = ({ onPress, text }) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    return (
        <View style={styles.friend}>
          {users.map((user, index) => (
            <View key={index} style={styles.friendItem}>
              <Image source={{ uri: user.picture.thumbnail }} style={styles.friendIcon}/>
            </View>
          ))}
        </View>
      );
}

const styles = StyleSheet.create({
  friend: {
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6.5,
  },
  friendIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ProfileFriends