import { View, Text, StyleSheet } from "react-native"

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { blue } from "../../../Shared/css";

export default function HistoryRoute({ item }) {


    return (

        <>
            <View style={styles.container}>

                {(item.departureTime || item.departureLocation) &&

                    <View style={{ flexDirection: "row" }}>

                        <FontAwesome name="flag" size={12} color="green" />

                        <Text style={{ marginLeft: 5 }}>{item?.departureTime} </Text>
                        <Text style={{ marginLeft: 5 }}>{item?.departureLocation}</Text>

                    </View>
                }

                {(item.arrivalTime || item.arrivalLocation) &&

                    <View style={{ flexDirection: "row" }}>

                        <FontAwesome name="flag" size={12} color="red" />

                        <Text style={{ marginLeft: 5 }}>{item?.arrivalTime}</Text>
                        <Text style={{ marginLeft: 5 }}>{item?.arrivalLocation}</Text>

                    </View>
                }

                <View style={styles.container}>

                    <View style={styles.row}>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>Km</Text>
                            <Text style={styles.itemText}>{item.routeKmDone}</Text>
                            <Text>Parcourus</Text>

                        </View>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>h</Text>
                            <Text style={styles.itemText}>{item.routeDuration}</Text>
                            <Text>de conduite</Text>
                        </View>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>h</Text>
                            <Text style={styles.itemText}>{item.routeStops}</Text>
                            <Text>d'arrêt</Text>
                        </View>

                    </View>

                    <View style={styles.row}>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>l/100</Text>
                            <Text style={styles.itemText}>{item.routeGasConsumtion}</Text>
                            <Text>consomation</Text>

                        </View>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>km/h</Text>
                            <Text style={styles.itemText}>{item.routeAverageSpeed}</Text>
                            <Text>vitesse moyenne</Text>

                        </View>

                        <View style={styles.cell}>

                            <Text style={styles.itemSmalltext}>g/mol</Text>
                            <Text style={styles.itemText}>{item.routeC02}</Text>
                            <Text>Rejet en CO2</Text>
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
        justifyContent: "center",
        alignContent: "center"
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
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
});