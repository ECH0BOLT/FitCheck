import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder}) => {
    return (
    <View style={styles.container}>
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 220,
        height: 36,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        elevation: 10,
    },
    input: {},
});

export default CustomInput