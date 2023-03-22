import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HeaderUnsub({
    // navigation, // if navigation needed incomment here  (for contact or RGPD later ?) 
    title
}) {

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});