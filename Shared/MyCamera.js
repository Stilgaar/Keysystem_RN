import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, BackHandler } from 'react-native';

// general styles to get the components a bit cleaner
import { generalStyles } from './css';

// react-native-camera package
// import { Camera } from 'react-native-vision-camera';

// Buttons, but gradient
import { GradientButton } from '../comps';

import { inventoryArray } from '../JSON/Fr/InventoryArray';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function MyCamera({
    routeType,
    dispatch,
    dispatchType,
    dispatchGeneralType,
    globalDispatch,
    goBackCondition,
    navigation,
    indexInventory
}) {

    ////////////////
    // Chose Camera Type state (for now it will be only the back one)
    ////////////////

    const [cameraPermission, setCameraPermission] = React.useState(null);

    ////////////////
    // To avoid flickering
    ////////////////

    const [isLoading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     async () => {
    //         const cameraPermission = await Camera.requestCameraPermission();
    //         setCameraPermission(cameraPermission);
    //     };
    // }, []);

    ////////////////
    // Back Button Handler (in CHECK IN // CHECKOUT)
    ////////////////

    const handleBackPress = () => {
        const currentScreen = inventoryArray[indexInventory].key;
        const previousScreen = inventoryArray[indexInventory - 1]?.key ?? routeType

        if (currentScreen === "CheckIn") {
            navigation.replace("CheckIn", { routeType: routeType });
            return true; // Tell the OS that we handled the back button press
        } else if (currentScreen === "CheckOut") {
            navigation.replace("CheckOut", { routeType: routeType });
            return true; // Tell the OS that we handled the back button press
        } else {
            navigation.replace(previousScreen, { routeType: routeType })
            return true; // Tell the OS that we handled the back button press
        }
    };

    React.useEffect(() => {
        dispatchGeneralType === "attributionInventory" &&
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // cleaning the useefect
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [indexInventory]);

    ////////////////
    // Get the Camera Ref in the JSX
    ////////////////

    let cameraRef = React.useRef();

    ////////////////
    // Function to get the pictures (its put in the globalContext)
    ////////////////


    // const takePhoto = async () => {
    //     if (cameraRef.current) {
    //         const options = { quality: 0.5, base64: true };
    //         const data = await cameraRef.current.takePictureAsync(options);
    //         globalDispatch(dispatch(data, dispatchGeneralType, dispatchType));
    //     }
    // };

    ////////////////
    // JSX
    ////////////////

    if (isLoading) {
        return (
            <View style={[generalStyles.container, generalStyles.colorContainer, generalStyles.center]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (cameraPermission !== 'authorized') {
        return (
            <View>
                <Text>You have denied camera permission.</Text>
            </View>
        );
    }

    if (cameraPermission === 'authorized') {

        return (

            <View style={styles.container}>

                {/* <Camera
                    style={styles.camera}
                    device={Camera.device.back}
                    isActive={true}
                    onCapturedPhoto={newPhoto => {
                        globalDispatch(dispatch(newPhoto, dispatchGeneralType, dispatchType));
                    }}
                > */}

                {dispatchGeneralType === "attributionInventory" &&

                    <GradientButton width={350}
                        handlePress={() => navigation.replace((indexInventory + 1) === inventoryArray.length ? routeType : inventoryArray[indexInventory + 1].key, { routeType: routeType })}
                        text={`${(indexInventory + 1) === inventoryArray.length ? "Fin" : "vers " + inventoryArray[indexInventory + 1].text}`} />
                }


                <View style={generalStyles.buttonContainer}>

                    {goBackCondition ? (

                        <GradientButton width={70}
                            borderRadius={20}
                            handlePress={() => navigation.goBack()}>

                            <FontAwesome5 name="backspace" size={30} color="white" />

                        </GradientButton>

                    ) : (

                        <GradientButton width={70}
                            borderRadius={50}
                            handlePress={takePhoto}>

                            <MaterialIcons name="add-a-photo" size={30} color="white" />

                        </GradientButton>

                    )}

                </View>

                {/* </Camera> */}

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});



