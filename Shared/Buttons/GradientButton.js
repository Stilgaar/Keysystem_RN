import * as React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generalStyles, primaryColor2} from '../css';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import StyledText from '../StyledText';

function GradientButton({
  iconName,
  iconSize,
  iconColor,
  text,
  handlePress,
  width = 200,
  borderRadius = 50,
  alignSelf = 'center',
  addStyle = {},
  color = primaryColor2,
  children,
  disabled = false,
  buttonPadding = 15,
  colorStart = '#53e9f7',
  colorEnd = '#632ec4',
  borderTopLeftRadius = 50,
  borderTopRightRadius = 50,
  borderBottomRightRadius = 50,
  borderBottomLeftRadius = 50,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      style={[
        addStyle,
        generalStyles.globalShadow,
        {
          width,
          borderRadius,
          alignSelf,
        },
      ]}>
      <LinearGradient
        colors={[colorStart, colorEnd]}
        style={[
          styles.button,
          {
            borderRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
          },
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View
          style={{
            padding: buttonPadding,
            borderRadius: borderRadius,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {iconName ? (
            <FontAwesome5
              style={[{paddingRight: 10}]}
              name={iconName}
              size={iconSize}
              color={iconColor}
            />
          ) : null}
          {text && <StyledText style={styles.buttonText}>{text}</StyledText>}

          {children && <View style={generalStyles.center}>{children}</View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default GradientButton;

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});
