import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { blackA, generalStyles } from "../css";

import { ButtonGoBack } from "../../comps"

export default function HeaderUnsub({
    navigation, // if navigation needed incomment here  (for contact or RGPD later WE'LL SEEEE ?) 
    title,
    initial
}) {

    return (

        <View style={[styles.header, generalStyles.globalShadow]}>

            {!initial && <ButtonGoBack onPress={() => navigation.goBack()} />}

            <Text style={styles.headerText}>{title}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingHorizontal: 20
    },
    headerText: {
        flex: 1,
        color: blackA,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center"
    },
});