import {Dimensions, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {generalStyles} from '../css';

function ButtonGoBack({onPress}) {
  const wwidth = Dimensions.get('window').width;

  return (
    <TouchableOpacity
      style={{position: 'absolute', zIndex: 500}}
      onPress={onPress}>
      <View style={{paddingLeft: 10}}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </View>
    </TouchableOpacity>
  );
}

export default ButtonGoBack;
