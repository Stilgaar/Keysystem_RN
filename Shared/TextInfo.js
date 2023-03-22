import React from "react"

import { View } from "react-native";

import StyledText from "./StyledText";

function TextInfo({
    array,
    data,
}) {

    return (
        <View>
            {array?.map((textInfo, index) => (

                <View style={{ flexDirection: "row", justifyContent: "space-between" }} key={index}>

                    <StyledText>
                        {textInfo.text}
                    </StyledText>

                    <StyledText>
                        {data?.[`${textInfo?.key}`]}
                        {data?.[`${textInfo?.secondKey}`] && <StyledText> / </StyledText>}
                        {data?.[`${textInfo?.secondKey}`]}
                    </StyledText>

                </View>

            ))
            }

        </View>

    );
}

export default TextInfo;
