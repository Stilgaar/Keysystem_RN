import React from "react";

import { Image, View } from "react-native";
import GradientButton from "./Buttons/GradientButton";

import { DispatchContext } from "../Context/StateContext";

import { delPictureDispatch } from "../Reducer/GlobalReducer/globalDispatch";

import PicsDropDownSelect from "./PicsDropDownSelect";

export default function PicsFromB64({
    picsArray,
    dispatchType,
    dispatchGeneralType,
    checked
}) {

    ////////////////
    // Value of the items
    ////////////////

    const { globalDispatch } = React.useContext(DispatchContext)

    const id = React.useId()

    return (

        <>
            {picsArray
                ?.map((pics, index) => (

                    <View key={`${index}-${id}`}>

                        <View
                            style={{
                                marginBottom: 5,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                marginTop: 5
                            }}>

                            <Image
                                source={{ uri: `data:image/jpg;base64,${pics.jpgFile.base64}` }}
                                style={{ width: 100, height: 100 }}
                            />

                            <View style={{ justifyContent: "center", alignSelf: "center" }}>

                                <GradientButton
                                    handlePress={() => globalDispatch(delPictureDispatch(index, dispatchGeneralType, dispatchType))}
                                    color={['#ff0000', '#ff0000']}
                                    text='X'
                                    width={40}
                                    alignSelf={`baseline`} />

                            </View>

                        </View>

                        {checked &&

                            <PicsDropDownSelect
                                index={index}
                                pics={pics}
                                dispatchType={dispatchType}
                                dispatchGeneralType={dispatchGeneralType} />

                        }

                    </View>
                ))}
        </>

    )
}

// 