import React from 'react';
import { View, StyleSheet } from 'react-native';

// general styles to get the components a bit cleaner
import { generalStyles } from './css';

import { Camera, CameraType } from 'react-native-camera-kit';
import { useFocusEffect } from '@react-navigation/native';

// Buttons, but gradient
import { GradientButton } from '../comps';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function MyCamera({
    dispatch,
    dispatchType,
    dispatchGeneralType,
    globalDispatch,
    goBackCondition,
    navigation,
}) {

    ////////////////
    // Back Button Handler (in CHECK IN // CHECKOUT)
    ////////////////

    const [isCameraVisible, setIsCameraVisible] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setIsCameraVisible(true);

            return () => {
                setIsCameraVisible(false);
            };
        }, [])
    );

    ////////////////
    // Get the Camera Ref in the JSX
    ////////////////

    let cameraRef = React.useRef();

    ////////////////
    // Function to get the pictures (its put in the globalContext)
    ////////////////

    const [isLoading, setIsLoading] = React.useState(false);

    const takePhoto = async () => {

        if (cameraRef.current) {
            setIsLoading(true);
            const data = await cameraRef.current.capture();

            try {
                // Read the file from the file system
                // with a BRAND NEW PACKAGE !! // NOT USED : GO FOR THE URI
                //  const fileContent = await RNFS.readFile(data.uri, 'base64');

                // Send base64 image to the global dispatch
                globalDispatch(dispatch(data, dispatchGeneralType, dispatchType));

            } catch (error) {
                console.error('Error reading file:', error);
            }
            finally {
                setIsLoading(false);
            }

        }
    }

    ////////////////
    // JSX
    ////////////////

    return (

        <View style={styles.container}>


            {isCameraVisible && (
                <Camera
                    style={{ flex: 1 }}
                    ref={cameraRef}
                    cameraType={CameraType.Back} // front/back(default)
                />
            )}

            <View style={generalStyles.buttonContainer}>

                {goBackCondition ? (

                    <GradientButton width={70}
                        borderRadius={20}
                        handlePress={() => navigation.goBack()}>

                        <FontAwesome5 name="backspace" size={30} color="white" />

                    </GradientButton>

                ) : (

                    <GradientButton
                        disabled={isLoading}
                        width={70}
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



