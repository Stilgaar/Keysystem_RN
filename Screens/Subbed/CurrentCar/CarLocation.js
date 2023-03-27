import React from "react"

import { StateContext } from "../../../Context/StateContext";

import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Platform, Switch } from 'react-native';

import StyledText from "../../../Shared/StyledText";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';

import { generalStyles } from '../../../Shared/css';

export default function CarLocation() {

    const { globalState } = React.useContext(StateContext)

    const [userLocation, setUserLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [locationPermission, setLocationPermission] = React.useState(null);

    const [state, setGlobalState] = React.useState(globalState);

    React.useEffect(() => {

        setTimeout(

            async () => {
                const state = await AsyncStorage.getItem('globalState');
                setGlobalState(JSON.parse(state));
            },

            10)

    }, [globalState]);


    const requestLocationPermission = async () => {

        if (Platform.OS === 'ios') {
            return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLocationPermission('granted');
                return 'granted';

            } else {
                setLocationPermission('denied');
                return 'denied';
            }
        }
    };

    const handleSwitchToggle = async () => {

        if (locationPermission !== 'granted') {

            const status = await requestLocationPermission();

            if (status === 'granted') {

                setErrorMsg(null);

            } else {

                setErrorMsg('Permission to access location was denied');

            }
        }
    };


    React.useEffect(() => {

        const getPos = async () => {

            const status = await requestLocationPermission();

            if (status !== 'granted') {

                setErrorMsg('');

                return;

            } else {

                Geolocation.getCurrentPosition((position) => setUserLocation(position))
            }

        }

        getPos()

    }, []);

    return (
        <>
            {locationPermission === 'granted' &&
                (userLocation?.coords?.latitude && userLocation?.coords?.longitude) ?

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
                                latitude: state?.currentCar?.[0]?.latitude,
                                longitude: state?.currentCar?.[0]?.longitude,
                            }}

                        >
                            <FontAwesome5 name="car" size={50} color="black" />

                        </Marker>


                    </MapView>

                </View>

                :

                <View style={styles.permissionContainer}>

                    <StyledText>{errorMsg || 'Loading ...'}</StyledText>

                    {locationPermission === 'denied' && (

                        <View style={styles.switchContainer}>

                            <StyledText>Enable location permission: </StyledText>
                            <Switch value={locationPermission === "granted"} onValueChange={handleSwitchToggle} />

                        </View>

                    )}

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
    permissionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
});