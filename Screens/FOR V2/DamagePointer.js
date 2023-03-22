import React from "react";

import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from "react-native";

import { generalStyles } from "../../Shared/css";

import { GradientButton } from "../../comps";

import damagepic from "../../../assets/Pics/inventory-damage.jpg"

// GesturePath : Function go get the path drawn
// GestureRecorder : Function to get the x / y position
import { GesturePathMultiple, GestureRecorderMultiple } from '../../Functions/DrawSVG';

// thats somethwing we'll use LATERS Aligator !

export default function DamagePointer({ navigation }) {

    const containerRef = React.useRef(null);

    const [containerWidth, setContainerWidth] = React.useState(Dimensions.get('window').width);
    const [containerHeight, setContainerHeight] = React.useState(Dimensions.get('window').height);

    const handleLayout = event => {
        const { width, height } = event.nativeEvent.layout;
        setContainerWidth(width);
        setContainerHeight(height);
    };

    const [paths, setPath] = React.useState([]);

    return (

        <ScrollView style={[generalStyles.container, { marginTop: 10, marginBottom: 65 }]}>

            <Text style={generalStyles.title}>
                Emplacement dommages
            </Text>

            <View onLayout={handleLayout}
                style={[generalStyles.center, generalStyles.whiteContainer, generalStyles.globalShadow]}>


                {/* IMAGE HERE */}

                <View style={generalStyles.overlay}>

                    <GesturePathMultiple
                        containerRef={containerRef}
                        paths={paths}
                        color={"red"}
                        containerHeight={containerHeight}
                        containerWidth={containerWidth}
                    />

                    <GestureRecorderMultiple
                        onPathChanged={newPath => { setPath(paths => [...paths, ...newPath]) }}
                        reset={paths.length > 0 ? true : false} />

                </View>

            </View>

            <View style={generalStyles.buttonSeparated}>

                <GradientButton text="Retour"
                    width={120}
                    handlePress={() => navigation.goBack()} />

                <GradientButton text="Remise à zéro"
                    width={120}
                    handlePress={() => setPath([])} />

                <GradientButton text="Sauvegarder"
                    width={120} />

            </View>

        </ScrollView>

    );
};


const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});