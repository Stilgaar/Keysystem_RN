import React from 'react';

import { Text, StyleSheet } from 'react-native';

const StyledText = (props) => {

    return (
        <Text {...props} style={[styles.text, props.style]}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});

export default StyledText;