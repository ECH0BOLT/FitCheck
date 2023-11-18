import React, {useRef} from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const CustomInput2 = ({value, setValue, placeholder}) => {

    const textInputRef = useRef(null);

    const handleContainerPress = () => {
      if (textInputRef.current) {
        Keyboard.dismiss();
        textInputRef.current.focus();
      }
    };

    return (
        <TouchableWithoutFeedback onPress={handleContainerPress}>
          <View style={styles.container}>
            <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
            <TextInput
              ref={textInputRef}
              value={value}
              onChangeText={setValue}
              placeholder={placeholder}
              placeholderTextColor='#DCDCC8'
              style={styles.input}
              editable={true}
            />
          </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#182E18',
        width: '95%',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginVertical: 10,
        elevation: 10,
        left: 8.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    input: {
        color: '#DCDCC8',
        fontSize: 20,
        left: 50,
    },
    searchIcon: {
        position: 'absolute',
        height: 30,
        width: 30,
        left: 10,
        top: 10,
    },
});

export default CustomInput2