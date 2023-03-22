import React from "react"
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"

import { primaryColor2 } from "../css"

export default function FlatButton({ text, onPress }) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: primaryColor2,
        width: 200,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
})