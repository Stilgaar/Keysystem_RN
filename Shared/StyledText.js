import {StyleSheet, Text} from 'react-native';

import React from 'react';

const StyledText = props => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'BrandonBold',
  },
});

export default StyledText;
