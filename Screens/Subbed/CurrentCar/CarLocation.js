import React from "react"

import { StateContext } from "../../../Context/StateContext";

import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

import { generalStyles } from '../../../Shared/css';

const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return 'granted';
        } else {
            return 'denied';
        }
    }
};

export default function CarLocation() {

    const { globalState } = React.useContext(StateContext)

    const [userLocation, setUserLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const status = await requestLocationPermission();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            Geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation(position);
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            )

        })();
    }, []);

    return (
        <>
            {(userLocation?.coords?.latitude && userLocation?.coords?.longitude) ?
                <View style={generalStyles.container}>

                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: userLocation?.coords?.latitude,
                            longitude: userLocation?.coords?.longitude,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        }} >

                        <Marker
                            coordinate={{
                                latitude: userLocation?.coords?.latitude,
                                longitude: userLocation?.coords?.longitude,
                            }}

                        >
                            <MaterialIcons name="person-pin" size={56} color="black" />

                        </Marker>

                        <Marker
                            coordinate={{
                                latitude: globalState?.currentCar?.[0]?.latitude,
                                longitude: globalState?.currentCar?.[0]?.longitude,
                            }}

                        >
                            <FontAwesome5 name="car" size={50} color="black" />

                        </Marker>


                    </MapView>

                </View>

                :

                <View>
                    <Text>Loading ...</Text>
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});