import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StateContext } from "../../Context/StateContext";

import { blackA, generalStyles } from "../css";

import AsyncStorage from "@react-native-async-storage/async-storage";

function HeadersPics({
    title,
    info,
    nombreMax,
    numberLenghtChecker,
}) {

    const { globalState } = React.useContext(StateContext)

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
            },

            10)

    }, [globalState]);

    function getWhat() {

        if (numberLenghtChecker === "attributionDamage") {

            return state?.["attributionDamage"].find(obj => obj[`${info}`])?.[`${info}`].length

        } else if (numberLenghtChecker === "attributionInventory") {

            return state?.["attributionInventory"].find(obj => obj[`${info}`])?.[`${info}`].length

        } else if (numberLenghtChecker === "attributionCost") {

            return state?.["attributionCost"].find(obj => obj[`${info}`])?.[`${info}`].length

        } else {

            return state?.[`${numberLenghtChecker}`]?.length
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