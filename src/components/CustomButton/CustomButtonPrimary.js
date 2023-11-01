import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const CustomButtonPrimary = ({ onPress, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button]}>
            <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A4A4A',
    borderRadius: 25,
    padding: 5,
    width: 215,
    elevation: 10,
  },

  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'regular',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },

});

export default CustomButtonPrimary