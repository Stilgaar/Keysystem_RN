import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { generalStyles, primaryColor2, greyish } from '../css';

function GradientButton({
    text,
    handlePress,
    width = 200,
    borderRadius = 8,
    alignSelf = "center",
    addStyle = {},
    color = primaryColor2,
    children,
    disabled = false,
    buttonPadding = 15
}) {

    return (

        <TouchableOpacity
            disabled={disabled}
            onPress={handlePress}
            style={[addStyle, generalStyles.globalShadow, {
                width: width,
                borderRadius: borderRadius,
                alignSelf: alignSelf,
                backgroundColor: disabled ? greyish : color,
            }]}
        >

            <View style={{ padding: buttonPadding, borderRadius: borderRadius }}>

                {text &&
                    <Text style={styles.buttonText}>{text}</Text>
                }

                {children &&
                    <View style={generalStyles.center}>{children}</View>
                }

            </View>

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