import React, {useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../components/CustomInput2';

const URL = "https://randomuser.me/api/?results=34";

const FriendList = ({ onPress, text }) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
      setOriginalUsers(users);
    }, [users]);

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

    function handleFilter(searchTerm) {
      if (searchTerm === "") {
        setUsers(originalUsers);
      } else {
        setUsers(
          originalUsers.filter((user) =>
            user.login.username.toUpperCase().includes(searchTerm.toUpperCase())
          )
        );
      }
    }
    
    return (
        <View>
            <SearchBar placeholder="Search" onChangeText={(text) => handleFilter(text)}/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
                <View style={styles.friend}>
                  {users.map((user, index) => (
                    <View key={index} style={styles.friendItem}>
                      <Image source={{ uri: user.picture.thumbnail }} style={styles.friendIcon}/>
                      <Text style={styles.friendText}>{`@${user.login.username}`}</Text>
                      <View style={styles.friendOptionsContainer}>
                          <TouchableOpacity
                            style={styles.friendOptions}
                            onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.optionsText}>Remove</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
            </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
  friendText: {
    color: '#DCDCC8',
    fontSize: 20,
    paddingLeft: 7.5,
    paddingTop: 5,
  },
  friend: {
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  friendIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendOptionsContainer: {
    backgroundColor: '#142614',
    width: 80,
    height: 35,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    left: 265,
    top: 10,
  },
  optionsText: {
    fontWeight: 'bold',
    color: '#DCDCC8',
    fontSize: 15,
    bottom: 1,
  },
});

export default FriendList