import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, Image } from 'react-native';
import ProfileFriends from '../../components/ProfileFriends/ProfileFriends';
import ProfileMemories from '../../components/ProfileMemories/ProfileMemories';
import {useNavigation,useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const MemoriesScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params?.email;
    console.log("MemoriesScreen/Email: " +email);
    const today = moment();
    const memoryBoxes = Array.from({ length: 110 }, (_, index) => today.clone().subtract(index, 'days'));

    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleBoxPress = (date) => {
      setSelectedDate(date);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const handleSeeAllPress = () => {
      navigation.navigate('Memories', {email:email});
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    const groupedMemoryBoxes = memoryBoxes.reduce((acc, boxDate) => {
      const month = boxDate.format('MMMM YYYY');
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(boxDate);
      return acc;
    }, {});

    return (
      <View style={styles.container}>
        <LinearGradient useAngle angle={150} colors={['#3B593B', '#142814']} style={styles.page}>
          <ScrollView style={styles.commentContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
            <Text style={styles.title}>Memories</Text>
            <View style={styles.memoryContainer}>
              {Object.entries(groupedMemoryBoxes).map(([month, boxes]) => (
                <View key={month}>
                  <Text style={styles.monthTitle}>{month}</Text>
                  <View style={styles.memoryContainer}>
                    {boxes.map((boxDate, index) => (
                      <TouchableOpacity key={index} onPress={() => handleBoxPress(boxDate)}>
                        <View style={styles.memoryBox}>
                          <Text style={styles.dateText}>{boxDate ? boxDate.format('MMM').toUpperCase() : ''}</Text>
                          <Text style={styles.dateText}>{boxDate ? boxDate.format('DD') : ''}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}

              <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={closeModal}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{selectedDate ? `You did not post on ${selectedDate.format('MMMM Do')}` : ''}</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </ScrollView>
        </LinearGradient>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile',{email:email})}>
            <Image source={require('../../assets/arrow.png')} style={styles.navLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AppHome',{email:email})}>
            <Image source={require('../../assets/logo2.png')} style={styles.navLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Friends',{email:email})}>
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
    paddingHorizontal: 16,
    paddingTop: 10,
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
    left: 115,
    textDecorationLine: 'underline',
  },
  memoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 1,
  },
  memoryBox: {
    borderColor: '#DCDCC8',
    borderWidth: 2,
    width: 56.4,
    height: 90,
    borderRadius: 7.5,
    marginBottom: 7.5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#DCDCC8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthTitle: {
    color: '#DCDCC8',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
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
    marginBottom: 15,
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
  seeAllButton: {
    backgroundColor: '#182E18',
    padding: 5,
    width: 100,
    borderRadius: 25,
    marginTop: -1,
    alignSelf: 'flex-end',
  },
  seeAllButtonText: {
    color: '#DCDCC8',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#142614',
    paddingVertical: 15,
    elevation: 5,
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
});

    export default MemoriesScreen;