import React from "react";
import { Dimensions, PanResponder, View, StyleSheet } from "react-native";
import Svg, { Polyline } from 'react-native-svg';

////////////////
// Function to render the recorded drawing in SVG
////////////////

export const GesturePath = ({ path, color }) => {

    const { width, height } = Dimensions.get('window');
    const points = path?.map(p => `${p.x},${p.y}`).join(' ');

    return (

        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>

            <Polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="3" />

        </Svg>
    );
};


export const GestureMini = ({ path, color }) => {

    const points = path?.map(p => `${p.x},${p.y}`).join(' ');

    return (

        <Polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3" />

    );
};

export const GesturePathMultiple = ({ paths, color, containerWidth, containerHeight }) => {

    return (

        <Svg height="100%" width="100%" viewBox={`0 0 ${containerWidth} ${containerHeight}`}>

            {paths.map((path, index) => (

                <GestureMini key={index} path={path} color={color} />

            ))}

        </Svg>
    );
};

////////////////
// Function to draw a path in a SVG
////////////////

export const GestureRecorder = ({ onPathChanged, reset }) => {

    const pathRef = React.useRef([]);

    React.useEffect(() => {
        if (!reset) pathRef.current = []
    }, [reset])

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            // onPanResponderGrant: () => { pathRef.current = [] },
            onPanResponderMove: (event) => {
                pathRef.current.push({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY,
                })
                // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
                onPathChanged([...pathRef.current]);
            },
            onPanResponderRelease: () => { onPathChanged([...pathRef.current]) }
        })
    ).current;

    return (
        <View
            style={StyleSheet.absoluteFill}
            {...panResponder.panHandlers}
        />
    );
}


////////////////
// Function to draw multiple paths in svg
////////////////

export const GestureRecorderMultiple = ({ onPathChanged, reset, paths }) => {

    const pathRef = React.useRef([]);

    React.useEffect(() => {
        if (!reset) {
            pathRef.current = []
        }
    }, [reset])

    const panResponder = React.useRef(

        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            // onPanResponderGrant: () => { pathRef.current = [] },
            onPanResponderMove: (event) => {
                pathRef.current.push({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY,
                })
                // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
                //onPathChanged([pathRef.current]);
            },
            onPanResponderRelease: () => {
                onPathChanged([pathRef.current]);
                pathRef.current = [];
            }
        })
    ).current;

    return (
        <View
            style={StyleSheet.absoluteFill}
            {...panResponder.panHandlers}
        />
    );
}