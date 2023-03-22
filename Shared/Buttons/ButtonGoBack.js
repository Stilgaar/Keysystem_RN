import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { generalStyles } from '../css';

function ButtonGoBack({ onPress }) {

    return (

        <TouchableOpacity style={{ justifyContent: "flex-start", alignItems: "flex-start" }} onPress={onPress}>

            <View style={[generalStyles.smallWhiteContainer, generalStyles.globalShadow]}>

                <Ionicons name="arrow-back-circle" size={30} color="black" />

            </View>

        </TouchableOpacity>

    );
}

export default ButtonGoBack;