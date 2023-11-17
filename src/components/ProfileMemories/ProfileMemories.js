import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const ProfileMemories = () => {
  const navigation = useNavigation();
  const today = moment();
  const memoryBoxes = Array.from({ length: 14 }, (_, index) => today.clone().subtract(index, 'days'));

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
    navigation.navigate('Memories');
  };

  return (
    <View style={styles.container}>
      {memoryBoxes.map((boxDate, index) => (
        <TouchableOpacity key={index} onPress={() => handleBoxPress(boxDate)}>
          <View style={styles.memoryBox}>
            <Text style={styles.dateText}>{boxDate ? boxDate.format('MMM').toUpperCase() : ''}</Text>
            <Text style={styles.dateText}>{boxDate ? boxDate.format('DD') : ''}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{selectedDate ? `You did not post on ${selectedDate.format('MMMM Do')}` : ''}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
        <Text style={styles.seeAllButtonText}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 7.5,
  },
  memoryBox: {
    borderColor: '#DCDCC8',
    borderWidth: 2,
    width: 47,
    height: 75,
    borderRadius: 7.5,
    marginBottom: 7.5,
    marginHorizontal: 2.571,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#DCDCC8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
});

export default ProfileMemories;
