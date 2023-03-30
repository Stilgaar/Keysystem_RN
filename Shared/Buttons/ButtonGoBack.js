import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { generalStyles } from '../css';

function ButtonGoBack({ onPress }) {

    const wwidth = Dimensions.get("window").width

    return (

        <TouchableOpacity style={{ position: "absolute", zIndex: 500 }} onPress={onPress}>

            <View style={[generalStyles.smallcolorContainer, generalStyles.globalShadow]}>

                <Ionicons name="arrow-back-circle" size={40} color="black" />

            </View>

        </TouchableOpacity>

    );
}

export default ButtonGoBack;