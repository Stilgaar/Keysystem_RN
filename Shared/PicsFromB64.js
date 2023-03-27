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
                                marginTop: 5,
                                alignItems: "center",
                            }}
                        >

                            {console.log(pics)}

                            <View style={{ position: "relative" }}>

                                <Image
                                    source={{ uri: `${pics.jpgFile.uri}` }}
                                    style={{ width: 300, height: 200 }}
                                />

                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                >
                                    <GradientButton
                                        handlePress={() =>
                                            globalDispatch(
                                                delPictureDispatch(index, dispatchGeneralType, dispatchType)
                                            )
                                        }
                                        color={["#ff0000", "#ff0000"]}
                                        text="X"
                                        width={50}
                                        buttonPadding={10}
                                    />

                                </View>

                            </View>
                        </View>


                        {checked && (
                            <PicsDropDownSelect
                                index={index}
                                pics={pics}
                                dispatchType={dispatchType}
                                dispatchGeneralType={dispatchGeneralType}
                            />
                        )}

                    </View>
                ))}
        </>

    )
}

// 