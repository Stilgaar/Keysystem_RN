import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';

import RNFS from 'react-native-fs';

// general styles to get the components a bit cleaner
import { generalStyles } from './css';

import { Camera, CameraType } from 'react-native-camera-kit';

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

    const takePhoto = async () => {

        if (cameraRef.current) {

            const data = await cameraRef.current.capture();

            try {
                // Read the file from the file system
                // with a BRAND NEW PACKAGE !!
                const fileContent = await RNFS.readFile(data.uri, 'base64');

                // Send base64 image to the global dispatch
                globalDispatch(dispatch(fileContent, dispatchGeneralType, dispatchType));
            } catch (error) {
                console.error('Error reading file:', error);
            }

        }
    }

    ////////////////
    // JSX
    ////////////////

    return (

        <View style={styles.container}>

            <Camera
                style={{ flex: 1 }}
                ref={cameraRef}
                cameraType={CameraType.Back} // front/back(default)
            />

            {/* <Camera
                    style={styles.camera}
                    device={Camera.device.back}
                   
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

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});



