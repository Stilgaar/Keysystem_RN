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

    function getWhat() {

        if (numberLenghtChecker === "attributionDamage") {

            return globalState?.["attributionDamage"].find(obj => obj[`${info}`])?.[`${info}`].length

        } else if (numberLenghtChecker === "attributionInventory") {

            return globalState?.["attributionInventory"].find(obj => obj[`${info}`])?.[`${info}`].length

        } else if (numberLenghtChecker === "attributionCost") {

            return globalState?.["attributionCost"].find(obj => obj[`${info}`])?.[`${info}`].length

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