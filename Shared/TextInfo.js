import React from "react"

import { Text, View, StyleSheet } from "react-native";

import { generalStyles } from "./css";

function TextInfo({
    array,
    data,
}) {

    return (
        <View>
            {array?.map((textInfo, index) => (

                <View style={{ flexDirection: "row", justifyContent: "space-between" }} key={index}>

                    <Text style={generalStyles.textInfoStyles}>
                        {textInfo.text}
                    </Text>

                    <Text style={generalStyles.textDataStyles}>
                        {data?.[`${textInfo?.key}`]}
                        {data?.[`${textInfo?.secondKey}`] && <Text> / </Text>}
                        {data?.[`${textInfo?.secondKey}`]}
                    </Text>

                </View>

            ))
            }

        </View>

    );
}

export default TextInfo;
