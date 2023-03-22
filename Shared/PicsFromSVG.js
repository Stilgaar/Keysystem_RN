import React from "react";
import { DispatchContext } from "../Context/StateContext";

import { View } from "react-native";

import { GradientButton } from "../comps";

import { SvgXml } from "react-native-svg";

function PicsFromSVG({ svg, dispatch }) {

    const { globalDispatch } = React.useContext(DispatchContext)

    return (

        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-around", marginTop: 5 }}>

            <SvgXml xml={svg} />

            <View style={{ justifyContent: "center", alignSelf: "center" }}>

                <GradientButton handlePress={() => globalDispatch(dispatch())}
                    color={['#bb0000', '#ff1a1a', '#ff0000']}
                    text='X'
                    width={50}
                    alignSelf={`baseline`} />

            </View>

        </View>
    )
}

export default PicsFromSVG;