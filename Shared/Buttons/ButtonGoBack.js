import { TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

import GradientButton from './GradientButton';
// import {generalStyles} from '../css';

function ButtonGoBack({ onPress }) {
  // const wwidth = Dimensions.get('window').width;

  return (
    <View>
      <GradientButton
              width={42}
              borderRadius={50}
              buttonPadding={8}
              colorStart='#7c7c7c'
              colorEnd='#111111'
              handlePress={onPress}>
              <Ionicons
                name={'arrow-back'}
                size={23}
                color={'white'}
              />
            </GradientButton>
    </View>

// <TouchableOpacity
    //   style={{ position: 'absolute', zIndex: 500 }}
    //   onPress={onPress}>

    //   <View style={{ paddingLeft: 10 }}>

    //     <Ionicons name="arrow-back-circle" size={40} color="black" />

    //   </View>

    // </TouchableOpacity>

  );
}

export default ButtonGoBack;
