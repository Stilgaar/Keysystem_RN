// React stuff
import React from "react";
import { View } from "react-native";

// The button but gradient
// the globalcontext also
import { GradientButton } from "../../../comps";

import PicsFromB64 from "../../../Shared/PicsFromB64";

// NPM packages
import { CheckBox } from 'react-native-elements';

////////////////
// I have this mapped inside a component to make the reading clearer 
// Parent <Damage />
////////////////

export default function DamageCheckBoxes({
    navigation,
    text,
    nav,
    route,
    globalState
}) {

    ////////////////
    // To open to the checkbox button stuff
    ////////////////

    const [open, setIsOpen] = React.useState(false)

    ////////////////
    // For the Dispatch & for the win !
    ////////////////

    const { dispatchGeneralType } = route.params

    ////////////////
    // Checks if the checkbox needs to be checked. (Will be checked if a picture in it, can't be unchecked when done)
    ////////////////

    const checked = globalState[`${dispatchGeneralType}`]?.find(obj => obj[nav])?.[nav].length > 0

    ////////////////
    // JSX
    ////////////////

    return (

        <View>

            <CheckBox
                title={text}
                checked={checked || open}
                onPress={() => setIsOpen(c => !c)}
                containerStyle={{ marginBottom: 10 }}
            />

            {(checked ? checked : open) &&

                <GradientButton
                    text={`Photo ${text}`}
                    handlePress={() => navigation.navigate(nav)} />
            }

            {checked &&
                <>
                    <PicsFromB64
                        picsArray={globalState[`${dispatchGeneralType}`]?.find(obj => obj[nav])?.[nav]}
                        dispatchGeneralType={dispatchGeneralType}
                        dispatchType={nav}
                        checked={checked}
                    />

                </>
            }

        </View>
    )

}