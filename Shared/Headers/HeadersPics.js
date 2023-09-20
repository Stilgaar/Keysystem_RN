import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StateContext } from "../../Context/StateContext";

import { blackA, generalStyles } from "../css";

function HeadersPics({
    title,
    info,
    nombreMax,
    numberLenghtChecker,
}) {

    const { globalState } = React.useContext(StateContext)

    // x)
    function getWhat() {

        if (numberLenghtChecker === "attributionDamage") {

            return globalState?.["attributionDamage"]?.[`${info}`].length

        } else if (numberLenghtChecker === "attributionInventory") {

            return 3

        } else if (numberLenghtChecker === "attributionCost") {

            return globalState?.["attributionCost"]?.[`${info}`]?.length

        } else {

            return globalState?.[`${numberLenghtChecker}`]?.length
        }
    }

    return (

        <View style={[styles.header, generalStyles.globalShadow]}>

            <Text style={styles.headerText}>{title}</Text>

            <Text style={styles.headerText}>{nombreMax} - {getWhat(numberLenghtChecker) || 0}</Text>

        </View>
    );
}

export default HeadersPics;

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: blackA,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: "row",
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
});