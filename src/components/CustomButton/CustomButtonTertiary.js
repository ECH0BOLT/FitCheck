import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CustomButtonTertiary = ({ onPress, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button]}>
            <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
  },

  text: {
    color: '#0A6CFF',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },

});

export default CustomButtonTertiary