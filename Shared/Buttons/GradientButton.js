import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { generalStyles, gradientColor, greyGradientColor } from '../css';


function GradientButton({
    text,
    handlePress,
    width = 200,
    paddingVertical = 14,
    paddingHorizontal = 10,
    borderRadius = 8,
    alignSelf = "center",
    addStyle = {},
    color = gradientColor,
    children,
    disabled = false
}) {

    return (

        <TouchableOpacity
            disabled={disabled}
            style={styles.container}
            onPress={handlePress}>

            <LinearGradient // Button Linear Gradient
                colors={!disabled ? color : greyGradientColor}
                style={[addStyle,
                    {
                        width: width,
                        paddingVertical: paddingVertical,
                        paddingHorizontal: paddingHorizontal,
                        borderRadius: borderRadius,
                        alignSelf: alignSelf,
                    }
                ]}>

                {text &&
                    <Text style={styles.buttonText}>{text}</Text>
                }

                {children &&
                    <View style={generalStyles.center}>{children}</View>
                }
            </LinearGradient>

        </TouchableOpacity>
    );
}

export default GradientButton;

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
}); 