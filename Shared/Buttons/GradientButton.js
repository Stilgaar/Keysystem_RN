import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { generalStyles, greyGradientColor, flatgreen } from '../css';

import StyledText from '../StyledText';

function GradientButton({
    text,
    handlePress,
    width = 200,
    borderRadius = 8,
    alignSelf = "center",
    addStyle = {},
    color = flatgreen,
    children,
    disabled = false,
    buttonPadding = 15
}) {

    return (

        <TouchableOpacity
            disabled={disabled}
            onPress={handlePress}
            style={[addStyle, {
                width: width,
                borderRadius: borderRadius,
                alignSelf: alignSelf,
                borderWidth: 4,
                borderColor: "black",
                backgroundColor: color,
            }]}
        >

            <LinearGradient // Button Linear Gradient
                colors={color}
                style={{ padding: buttonPadding, borderRadius: borderRadius, }}>


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
        color: 'black',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "BrandonBold",
    }
}); 