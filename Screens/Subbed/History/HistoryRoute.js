import { View, StyleSheet } from "react-native"

import StyledText from "../../../Shared/StyledText";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { generalStyles, greyish } from "../../../Shared/css";

import { blue } from "../../../Shared/css";

export default function HistoryRoute({ item }) {


    return (

        <>
            <View style={[styles.container]}>
                {(item.departureTime || item.departureLocation) &&

                    <View style={{ flexDirection: "row" }}>

                        <FontAwesome name="flag" size={12} color="green" />

                        <StyledText style={{ marginLeft: 5 }}>{item?.departureTime} </StyledText>
                        <StyledText style={{ marginLeft: 5 }}>{item?.departureLocation}</StyledText>

                    </View>
                }

                {(item.arrivalTime || item.arrivalLocation) &&

                    <View style={{ flexDirection: "row" }}>

                        <FontAwesome name="flag" size={12} color="red" />

                        <StyledText style={{ marginLeft: 5 }}>{item?.arrivalTime}</StyledText>
                        <StyledText style={{ marginLeft: 5 }}>{item?.arrivalLocation}</StyledText>

                    </View>
                }

                <View style={styles.container}>

                    <View style={styles.row}>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>Km</StyledText>
                            <StyledText style={styles.itemText}>{item.routeKmDone}</StyledText>
                            <StyledText>Parcourus</StyledText>

                        </View>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>h</StyledText>
                            <StyledText style={styles.itemText}>{item.routeDuration}</StyledText>
                            <StyledText>de conduite</StyledText>
                        </View>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>h</StyledText>
                            <StyledText style={styles.itemText}>{item.routeStops}</StyledText>
                            <StyledText>d'arrêt</StyledText>
                        </View>

                    </View>

                    <View style={styles.row}>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>l/100</StyledText>
                            <StyledText style={styles.itemText}>{item.routeGasConsumtion}</StyledText>
                            <StyledText>consomation</StyledText>

                        </View>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>km/h</StyledText>
                            <StyledText style={styles.itemText}>{item.routeAverageSpeed}</StyledText>
                            <StyledText>vitesse moyenne</StyledText>

                        </View>

                        <View style={styles.cell}>

                            <StyledText style={styles.itemSmalltext}>g/mol</StyledText>
                            <StyledText style={styles.itemText}>{item.routeC02}</StyledText>
                            <StyledText>Rejet en CO2</StyledText>
                        </View>

                    </View>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        color: blue,
        fontSize: 50
    },
    itemSmalltext: {
        position: "absolute",
        top: 0,
        right: 1,
        fontSize: 10
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});